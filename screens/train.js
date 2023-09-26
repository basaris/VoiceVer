import React, {useState, useEffect, Component} from 'react';
import { View, Text, Image,TouchableOpacity, StatusBar, PermissionsAndroid} from 'react-native';
import { trainStyles } from '../styles/trainStyles';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';

import {NativeModules} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const {PythonModule} = NativeModules;

import RNFS from 'react-native-fs';

const filePath = RNFS.DocumentDirectoryPath + '/state.json';



export default class Train extends Component {
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
        firstTraining:false,
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
    
        setTimeout(this.stopTimer, 120000);
      }

    stopTimer = () => {
        clearInterval(this.timer);
        this.setState({ isRunning: false, mic:false});
        this.stop().then(res => {
            console.log("oh",res);
            PythonModule.passingToPython(res)
            .then(res2 => {
                const jsonData = JSON.stringify({"state":"firstTrain"});

                RNFS.writeFile(filePath, jsonData, 'utf8')
                .then(() => {
                    console.log('Data written to state.json');
                    this.props.navigation.push('Train')
                })
                .catch((error) => {
                    console.error('Error writing JSON file:', error);
                });

                
            })
        });
    }

    async componentDidMount(){
        RNFS.readFile(filePath, 'utf8')
            .then((fileContent) => {
                const data = JSON.parse(fileContent);

                if(data.state == "firstTrain"){
                    this.setState({
                        firstTraining: true,
                      });
                }else if(data.state == "unTrained"){
                    this.setState({
                        firstTraining: false,
                      });
                }
                
            })
            .catch((error) => {
                console.error('Error reading JSON file:', error);
            });

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
            <View style={trainStyles.container}>
                <Text style={trainStyles.title}>Training</Text>
                <Text style={[trainStyles.titleText,{fontSize:17}]}>Διάβασε αργά και καθαρά το παρακάτω κείμενο.</Text>
                <ScrollView style={trainStyles.scroll}>
                    <Text style={trainStyles.titleText}>Η αναγνώριση ομιλητή είναι η διαδικασία της αυτόματης αναγνώρισης του ατόμου που μιλάει με βάση κάποια συγκεκριμένα χαρακτηριστικά
                     που εξάγονται από τη φωνή του. Υπάρχει μια σημαντική διαφορά ανάμεσα στην αναγνώριση ομιλητή και στην αναγνώριση ομιλίας. Στην πρώτη περίπτωση 
                     ενδιαφερόμαστε να αναγνωρίσουμε ποιος μιλάει ενώ στη δεύτερη να αναγνωρίσουμε τι έχει ειπωθεί. Η αναγνώριση φωνής αποτελεί τον συνδυασμό των 
                     δύο παραπάνω. Η αναγνώριση ομιλητή δίνει τη δυνατότητα να χρησιμοποιηθεί η φωνή ενός ομιλητή για ταυτοποίηση και έλεγχο πρόσβασης σε διάφορες υπηρεσίες 
                     όπως τραπεζικές συναλλαγές μέσω τηλεφώνου, φωνητικές κλήσεις, αγορές μέσω τηλεφώνου, υπηρεσίες πρόσβασης σε βάσεις δεδομένων, υπηρεσίες πληροφοριών, 
                     έλεγχο ασφάλειας σε περιοχές εμπιστευτικών πληροφοριών, εξ΄ αποστάσεως πρόσβαση σε υπολογιστές κτλ.

                    Η αναγνώριση ομιλητή περιλαμβάνει διαδικασίες όπως η ταυτοποίηση και η επαλήθευση. Η ταυτοποίηση ενός ομιλητή στοχεύει στον προσδιορισμό του ατόμου που 
                    παρέχει μια συγκεκριμένη φράση.
                    </Text>
                </ScrollView>
                
    
                <TouchableOpacity onPress={mic?null:()=>{this.start();}} activeOpacity={0.4} style={[trainStyles.iconButton,{opacity:mic?0.4:1}]}>
                    <Image
                        style={[trainStyles.icon]}
                        source={require('../assets/micBlack.png')}
                    />
                </TouchableOpacity>
                
                <Text style={trainStyles.seconds}>00:{seconds<10?'0'+seconds:seconds}/02:00</Text>
                <Text style={{fontSize:18, color: '#333', paddingTop:25, paddingBottom:25 }}>Πάτησε και μίλα στο μικρόφωνο.</Text>
    
                <StatusBar
                    backgroundColor='white'
                    barStyle='dark-content'
                />
            </View>
        )
}
}


