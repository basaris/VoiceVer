import React, { useEffect, useState ,Component} from 'react';
import {StyleSheet, View, Text, StatusBar, Image, TouchableOpacity, PermissionsAndroid, Button} from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';




export default class Home extends Component {
    sound=null;
    state = {
        audioFile: '',
        recording:false,
        loaded:false,
        paused:true,
    };

    async componentDidMount(){

        await this.checkPermission();

        const options = {
            sampleRate: 44100,  // default 44100
            channels: 1,        // 1 or 2, default 1
            bitsPerSample: 16,  // 8 or 16, default 16
            audioSource: 6,     // android only (see below)
            wavFile: 'test.m4a' // default 'audio.wav'
          };

        AudioRecord.init(options);

        AudioRecord.on('data', data => {
            const chunk = Buffer.from(data,'base64');
        });
    }

    checkPermission = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: "Cool Photo App Camera Permission",
                message:
                    "Cool Photo App needs access to your camera " + 
                    "so you can take awesome pictures.",
                buttonNeutral:"Ask Me Later",
                buttonNegative:"Cancel",
                buttonPositive:"Ok"
            }
        );

        const p = await Permissions.check('microphone');
        console.log('permission check', p);
        if (p==='authorized') return;
        return this.requestPermission();
    };
    
    requestPermission = async () => {
        const p = await Permissions.request('microphone');
        console.log('permission request', p);
    };

    start = () => {
        console.log('start record');
        this.setState({audioFile:'', recording:true, loaded: false});
        AudioRecord.start();
    };

    stop = async () => {
        if(!this.state.recording)return;
        console.log('stop record');
        let audioFile = await AudioRecord.stop();
        console.log('audioFile', audioFile);
        this.setState({audioFile, recording:false});
    };

    load = () => {
        return new Promise((resolve, reject) => {
            if(!this.state.audioFile) {
                return reject('file path is empty');
            }

            this.sound = new Sound(this.state.audioFile, '', error => {
                if(error){
                    console.log('failed to load the file',error);
                    return reject(error);
                }
                this.setState({loaded:true});
                return resolve();
            });
        });
    };

    play = async () => {
        if (!this.state.loaded){
            try{
                await this.load();
            }catch{
                console.log(error);
            }
        }

        this.setState({paused:false});
        Sound.setCategory('Playback');

        this.sound.play(success => {
            if(success){
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
            this.setState({paused:true});
        });
    }

    pause = () => {
        this.sound.pause();
        this.setState({paused:true});
    };
   
    render() {
        const {recording, paused, audioFile} = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <Button onPress={this.start} title='Record' disabled={recording}/>
                    <Button onPress={this.stop} title='Stop' disabled={!recording}/>
                    {paused?(
                        <Button onPress={this.play} title='Play' disabled={!audioFile}/>
                    ):(
                        <Button onPress={this.pause} title='Pause' disabled={!audioFile}/>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});
