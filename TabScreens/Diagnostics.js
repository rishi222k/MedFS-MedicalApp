import { RefreshControl,View, Text,Button,ScrollView,Image,StyleSheet,TouchableOpacity } from 'react-native'
import React,{useState, useContext,useEffect} from 'react'
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../Navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import FeetMap from '../Components/FeetMap'
import DummyDiag from '../DummyScreens/DummyDiag';
import data from '../QDictionary'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Diagnostics = () => {
  const navigation = useNavigation();
  const {user,logout} = useContext(AuthContext);
  const [diagcheck, setdiagcheck] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const [Condition, setCondition] = useState(); 
  const [Pain, setPain] = useState(); 
  const [Deformity, setDeformity] = useState(); 
  const [Comorb, setComorb] = useState(); 
  const [Angle, setAngle] = useState(); 
  const [Duration, setDuration] = useState(); 
  const [Footwear, setFootwear] = useState(); 
  const [Swell, setSwell] = useState(); 
  const [Hormone, setHormone] = useState(); 
  const [countleft, setcountleft] = useState(0); 
  const [countright, setcountright] = useState(0); 

  const [senseone, setsenseone] = useState(true);
  const [sensetwo, setsensetwo] = useState(true);
  const [sensethree, setsensethree] = useState(true);
  const [sensefour, setsensefour] = useState(true);
  const [sensefive, setsensefive] = useState(true);
  const [sensesix, setsensesix] = useState(true);
  const [sensesevn, setsensesevn] = useState(true);
  const [senseight, setsenseight] = useState(true);

  const [sensedone, setsensedone] = useState(true);
  const [sensedtwo, setsensedtwo] = useState(true);
  const [sensedthree, setsensedthree] = useState(true);
  const [sensedfour, setsensedfour] = useState(true);
  const [sensedfive, setsensedfive] = useState(true);
  const [sensedsix, setsensedsix] = useState(true);
  const [sensedsevn, setsensedsevn] = useState(true);
  const [sensedeight, setsensedeight] = useState(true);


  const sensedata= async()=>{ 

    const users = await firestore().collection('Diagnosis').doc(user.uid).get()
    .then(documentSnapshot => {
      
      setsenseone(documentSnapshot.data().sense1);
      setsensetwo(documentSnapshot.data().sense2);
      setsensethree(documentSnapshot.data().sense3);
      setsensefour(documentSnapshot.data().sense4);
      setsensefive(documentSnapshot.data().sense5);
      setsensesix(documentSnapshot.data().sense6);
      setsensesevn(documentSnapshot.data().sense7);
      setsenseight(documentSnapshot.data().sense8);

      setsensedone(documentSnapshot.data().sense9);
      setsensedtwo(documentSnapshot.data().sense10);
      setsensedthree(documentSnapshot.data().sense11);
      setsensedfour(documentSnapshot.data().sense12);
      setsensedfive(documentSnapshot.data().sense13);
      setsensedsix(documentSnapshot.data().sense14);
      setsensedsevn(documentSnapshot.data().sense15);
      setsensedeight(documentSnapshot.data().sense16);
      
    });
  };

  const countload=async()=>{

  const left = [senseone, sensetwo, sensethree, sensefour, sensefive,sensesix,sensesevn,senseight];
  const right = [sensedone, sensedtwo, sensedthree, sensedfour, sensedfive,sensedsix,sensedsevn,sensedeight];

    await firestore().collection('Diagnosis').doc(user.uid).update({
      cleft: 8-left.filter(Boolean).length,
      cright: 8-right.filter(Boolean).length,
    })
    .then(() => {
      console.log('Count updated on cloud firestore!');
      setcountleft(8-left.filter(Boolean).length);
      setcountright(8-right.filter(Boolean).length);
    });
  };

  const userdata= async()=>{ 
    const users = await firestore().collection('Users').doc(user.uid).get()
    .then(documentSnapshot => {
      setCondition(data[5][documentSnapshot.data().question6]);
      setPain(data[11][documentSnapshot.data().question12]);
      setDeformity(data[9][documentSnapshot.data().question10]);
      setComorb(data[6][documentSnapshot.data().question7]);
      setAngle(data[8][documentSnapshot.data().question9]);
      setDuration(data[3][documentSnapshot.data().question4]);
      setFootwear(data[4][documentSnapshot.data().question5]);
      setSwell(data[7][documentSnapshot.data().question8]);
      setHormone(data[10][documentSnapshot.data().question11]);
    });
  };

  const diagdata= async()=>{ 
    const users = await firestore().collection('Diagnosis').doc(user.uid).get()
    .then(documentSnapshot => {
      setdiagcheck(documentSnapshot.data().diagcheck);
    });
  
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    sensedata();
    diagdata();
    countload();
    wait(2000).then(() => setRefreshing(false));
  }, []);

    useEffect(() => {
      sensedata();
      userdata();
      diagdata();
      countload();
      }, [sensedeight]);

    

  return (
    <ScrollView 
    style={{backgroundColor:"#fff",height:"100%"}}
    refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />}>
    {!diagcheck? <DummyDiag/>:<View style={{backgroundColor:"#fff",height:"100%",paddingHorizontal:"6%"}}>
    <Text style={{fontFamily:"SFNSBold",fontSize:25,marginVertical:30}}>Diagnostics Report</Text>
    <FeetMap 
      senseone={senseone}
      sensetwo={sensetwo}
      sensethree={sensethree}
      sensefour={sensefour}
      sensefive={sensefive}
      sensesix={sensesix}
      sensesevn={sensesevn}
      senseight={senseight}
      sensedone={sensedone}
      sensedtwo={sensedtwo}
      sensedthree={sensedthree}
      sensedfour={sensedfour}
      sensedfive={sensedfive}
      sensedsix={sensedsix}
      sensedsevn={sensedsevn}
      sensedeight={sensedeight}
    />

    
    <View style={styles.container}>
    <Text style={styles.containertitle}>Left Leg Report</Text>
    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
    <View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Affected Nodes</Text>
            <Text style={styles.entry}>{countleft}</Text>
        </View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Level of Severity</Text>
            <Text style={styles.entry}>75%</Text>
        </View>
    </View>
    <View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Condition</Text>
            <Text style={styles.entry}>Severe</Text>
        </View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Region</Text>
            <Text style={styles.entry}>Forefoot</Text>
        </View>
    </View>
    </View>
    </View>

    <View style={styles.container}>
    <Text style={styles.containertitle}>Right Leg Report</Text>
    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
    <View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Affected Nodes</Text>
            <Text style={styles.entry}>{countright}</Text>
        </View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Level of Severity</Text>
            <Text style={styles.entry}>35%</Text>
        </View>
    </View>
    <View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Condition</Text>
            <Text style={styles.entry}>Mild</Text>
        </View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Region</Text>
            <Text style={styles.entry}>Whole foot</Text>
        </View>
    </View>
    </View>
    </View>

    <View style={styles.ncontainer}>
    <Text style={styles.containertitle}>Medical Information</Text>
    <View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Condition of foot</Text>
            <Text style={styles.entry}>{Condition}</Text>
        </View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Pain</Text>
            <Text style={styles.entry}>{Pain}</Text>
        </View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Foot deformity</Text>
            <Text style={styles.entry}>{Deformity}</Text>
        </View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Movement of ankle joint</Text>
            <Text style={styles.entry}>{Angle}</Text>
        </View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Comorbidities</Text>
            <Text style={styles.entry}>{Comorb}</Text>
        </View>
    </View>
    <View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Duration of diabetes</Text>
            <Text style={styles.entry}>{Duration}</Text>
        </View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Type of footwear</Text>
            <Text style={styles.entry}>{Footwear}</Text>
        </View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Swelling</Text>
            <Text style={styles.entry}>{Swell}</Text>
        </View>
        <View style={styles.innercontainer}>
            <Text style={styles.title}>Change in hormone level</Text>
            <Text style={styles.entry}>{Hormone}</Text>
        </View>
    </View>
    </View>

    <View style={[styles.container,{marginBottom:40}]}>
    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
    <View>
        <Text style={styles.ntitle}>Level of Severity</Text>
        <Text style={styles.entry}>64%</Text>
    </View>
    <View>
      <Text style={styles.ntitle}>Medication</Text>
      <Text style={styles.entry}>Recommended</Text>
    </View>
    </View>
    </View>

    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',}}>
    <TouchableOpacity
    onPress={()=>{navigation.navigate('TabNavigation', { screen: 'Health' })}}>
        <View style={[styles.but1]}>
            <Text style={{fontFamily:"CircularXXTTBold",color:"white", fontSize:18,textAlign:'center'}}>
            Get Help
            </Text>
          </View>
    </TouchableOpacity>
    <TouchableOpacity 
    onPress={()=>{navigation.navigate('TabNavigation', { screen: 'Sense' })}}>
        <View style={[styles.but2]}>
            <Text style={{fontFamily:"CircularXXTTBold",color:"#FFB31D", fontSize:18,textAlign:'center'}}>
            New Diagnosis
            </Text>
          </View>
    </TouchableOpacity>
    </View>

    </View>}
    </ScrollView>
  )
}

export default Diagnostics

const styles = StyleSheet.create({
  title:{
      fontFamily:"CircularXXTTBold",
      fontSize:16.5,
      color:'#FFAA00',
      marginBottom:3,
    },
    ntitle:{
      fontFamily:"CircularXXTTBold",
      fontSize:16.5,
      color:'#0012FF',
      marginBottom:3,
    },
    entry:{
      fontFamily:"CircularXXTTMedium",
      fontSize:18,
      color:'#3A3A3A',
    },
    container:{
      marginTop:30,
      backgroundColor:"#F2F2F2",
      paddingLeft:20,
      paddingRight:30,
      paddingVertical:20,
      borderRadius:10,
    },
    ncontainer:{
      marginTop:30,
      backgroundColor:"#FFF",
      paddingLeft:20,
      paddingRight:30,
      paddingVertical:0,
      borderRadius:10,
    },
    innercontainer:{
        marginBottom:15,
        width:"100%"
    },
    containertitle:{
      fontFamily:"CircularXXTTBold",
      fontSize:20,
      color:'#0012FF',
      marginBottom:20
    },
    but1:{
      width:160,
      borderRadius:5,
      paddingVertical:13,
      alignSelf:'center',
      marginBottom:30,
      backgroundColor:"#FFB31D",
    },
    but2:{
      width:160,
      borderRadius:5,
      borderColor:"#FFB31D",
      borderWidth:2.5,
      paddingVertical:11,
      alignSelf:'center',
      marginBottom:30,
      backgroundColor:"#FFF",
    },
  })