import React, {useState, useEffect, Component} from 'react';
import { Modal, View, Text, Image,TouchableOpacity, StatusBar, PermissionsAndroid, Pressable} from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';


import { testStyles } from '../styles/testStyles';
import { trainStyles } from '../styles/trainStyles';

import {NativeModules} from 'react-native';
const {PythonModule} = NativeModules;




export default class Test extends Component {
    sound=null;
    timer=null;
    state = {
        audioFile: '',
        recording:false,
        loaded:false,
        paused:true,
        mic:false,
        seconds:0,
        isRunning:false,
        ModalVisible:false,
        color:'',
        verify:"Verified",
    };

    componentWillUnmount(){
        this.sound=null;
    }

    startTimer = () => {
        this.setState({
          seconds: 0,
          isRunning: true,
        });
    
        this.timer = setInterval(() => {
          this.setState((prevState) => ({
            seconds: prevState.seconds + 1,
          }));
        }, 1000);
    
        setTimeout(this.stopTimer, 5000);
      }

    stopTimer = () => {
        clearInterval(this.timer);
        this.setState({ isRunning: false, mic:false});
        this.stop().then(res => {
            console.log("oh",res);
            PythonModule.openFile(res)
            .then(res2 => {
                this.setState({ModalVisible:true});

                let x = res2.split(':')[1].split('}')[0];
                let y = x.substring(2, x.length - 1);

                if(y=='verified'){
                    this.setState({color:'#2ECE43',verify:'Verified'});
                    }
                else{
                    this.setState({color:'#FF3333',verify:'Not-Verified'});
                }
            })
        });
    }

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
                title: "VoiceVer Mic Permission",
                message:
                    "VoiceVer needs access to your mic " + 
                    "so it can check the identity of the speaker.",
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
        this.setState({audioFile:'', recording:true, loaded: false, mic:true});
        this.playSound();
        setTimeout(()=>{
            AudioRecord.start();
            this.startTimer();
        },600);
        
    };

    stop = async () => {
        if(!this.state.recording)return;
        console.log('stop record');
        let audioFile = await AudioRecord.stop();
        console.log('audioFile', audioFile);
        this.setState({audioFile, recording:false});
        return(audioFile);
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
    
    playSound = () => {
        const sound = new Sound('click.wav', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('Failed to load the sound', error);
            return;
          }
          sound.play();
    })
    };



    render() {
        const {recording, paused, audioFile, mic, seconds, isRunning, ModalVisible, color, verify} = this.state;



         return(
        <View style={[trainStyles.container,{opacity:ModalVisible?0.1:1.0}]}>
            <Text style={trainStyles.title}>Testing</Text>
            <Text style={testStyles.titleText}>Πείτε μια φράση 5 δευτερολέπτων αργά και καθαρά.
            </Text>

            <TouchableOpacity onPress={mic?null:()=>{this.start();}} activeOpacity={0.4} style={[testStyles.iconButton,{opacity:mic?0.4:1}]}>
                <Image
                    style={[trainStyles.icon]}
                    source={require('../assets/micBlack.png')}
                />
            </TouchableOpacity>
            
            <Text style={trainStyles.seconds}>00:0{seconds}</Text>
            <Text style={{fontSize:18, color: '#333', paddingTop:80 }}>Πατήστε και μιλήστε.</Text>


        <Modal
            animationType="slide"
            transparent={true}
            visible={ModalVisible}  
        >
            <View style={testStyles.Modal}></View>
            <View style={[testStyles.modal,{borderColor:verify=='Verified'?'green':'red'}]}>
                {verify=='Verified'?
                <Image style={[trainStyles.icon2]} source={require('../assets/accept.png')}/>
                :
                <Image style={[trainStyles.icon3]} source={require('../assets/decline.png')}/>
                }

                {verify=='Verified'?
                <Text style={testStyles.button}>Συγχαρητήρια! Είσαι όντως εσύ.</Text>
                :
                <Text style={testStyles.button}>Kάτι δεν πήγε καλα. Δοκίμασε ξανα.</Text>
                }
                
                <Text style={testStyles.button2} onPress={() => this.setState({ModalVisible:false})}>Δοκίμασε ξανά</Text>
            </View>
            
        </Modal>
            

            <StatusBar
                backgroundColor='white'
                barStyle='dark-content'
            />

        </View>
    )
    }
}