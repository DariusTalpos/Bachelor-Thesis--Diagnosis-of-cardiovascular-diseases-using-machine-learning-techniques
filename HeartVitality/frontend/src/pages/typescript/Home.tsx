import {
    IonButton,
    IonContent, IonDatetime,
    IonHeader,
    IonInput,
    IonLabel,
    IonList, IonModal,
    IonPage, IonRadio,
    IonRadioGroup,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import '../css/Home.css';
import {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import axios from 'axios';
import * as fs from "fs";
import {waitFor} from "@testing-library/dom";
import result from "./Result";
import {FormInfo} from "../../classes/FormInfo";

const Home: React.FC<RouteComponentProps> = ({history}) => {

  const [dateOfBirth, setDateOfBirth] = useState(new Date);
  const [gender, setGender] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [sys, setSys] = useState(0);
  const [dia, setDia] = useState(0);
  const [cholesterol, setCholesterol] = useState(-1);
  const [glucose, setGlucose] = useState(-1);
  const [smoke, setSmoke] = useState(-1);
  const [alcohol, setAlcohol] = useState(-1);
  const [physical, setPhysical] = useState(-1);
  const [message, setMessage] = useState("");

  const [language, setLanguage] = useState("ro");
  const [title, setTitle] = useState("Formular pentru diagnosticarea bolilor cardiovasculare");
  const [dateOfBirthLabel, setDateOfBirthLabel] = useState("Data nașterii");
  const [genderLabel, setGenderLabel] = useState("Sexul");
  const [maleLabel, setMaleLabel] = useState("Masculin");
  const [femaleLabel, setFemaleLabel] = useState("Feminin");
  const [heightLabel, setHeightLabel] = useState("Înălțimea");
  const [weightLabel, setWeightLabel] = useState("Greutatea");
  const [sysLabel, setSysLabel] = useState("Tensiunea sistolică (mare)");
  const [diaLabel, setDiaLabel] = useState("Tensiunea diastolică (mică)");
  const [cholesterolLabel, setCholesterolLabel] = useState("Nivelul de colesterol");
  const [glucoseLabel, setGlucoseLabel] = useState("Nivelul de glucoză");
  const [normalLabel, setNormalLabel] = useState("Normal");
  const [increasedLabel, setIncreasedLabel] = useState("Ridicat");
  const [riskyLabel, setRiskyLabel] = useState("Riscant");
  const [smokeLabel, setSmokeLabel] = useState("Sunteți un fumător activ");
  const [alcoholLabel, setAlcoholLabel] = useState("Consumați alcool des");
  const [physicalLabel, setPhysicalLabel] = useState("Sunteți o persoană activă");
  const [yesLabel, setYesLabel] = useState("Da");
  const [noLabel, setNoLabel] = useState("Nu");
  const [buttonLabel, setButtonLabel] = useState("Trimiteți datele");

  const [notCompletedDOB, setNotCompletedDOB] = useState("Câmpul pentru classes nașterii nu a fost completat.");
  const [incorrectDOB, setIncorrectDOB] = useState("Data nașterii nu poate fi în viitor.")
  const [notCompletedGender, setNotCompletedGender] = useState("Trebuie selectată o opțiune pentru sex.")
  const [notCompletedHeight, setNotCompletedHeight] = useState("Câmpul pentru înălțime nu a fost completat.")
  const [incorrectHeight, setIncorrectHeight] = useState("Înălțimea nu poate fi negativă.")
  const [notCompletedWeight, setNotCompletedWeight] = useState("Câmpul pentru greutate nu a fost completat.")
  const [incorrectWeight, setIncorrectWeight] = useState("Greutatea nu poate fi negativă.")
  const [notCompletedSys, setNotCompletedSys] = useState("Câmpul pentru tensiunea sistolică nu a fost completat.")
  const [incorrectSys, setIncorrectSys] = useState("Tensiunea sistolică nu poate fi negativă.")
  const [notCompletedDia, setNotCompletedDia] = useState("Câmpul pentru tensiunea diastolică nu a fost completat.")
  const [incorrectDia, setIncorrectDia] = useState("Tensiunea diastolică nu poate fi negativă.")
  const [notCompletedCholesterol, setNotCompletedCholesterol] = useState("Trebuie selectată o opțiune pentru nivelul de colesterol.")
  const [notCompletedGlucose, setNotCompletedGlucose] = useState("Trebuie selectată o opțiune pentru nivelul de glucoză.")
  const [notCompletedSmoke, setNotCompletedSmoke] = useState("Trebuie selectată o opțiune pentru fumat.")
  const [notCompletedAlcohol, setNotCompletedAlcohol] = useState("Trebuie selectată o opțiune pentru consumul de alcool.")
  const [notCompletedPhysical, setNotCompletedPhysical] = useState("Trebuie selectată o opțiune pentru activiatea fizică.")


  const normalCholesterol ="(< 200)"
  const increasedCholesterol ="(200-240)"
  const riskyCholesterol ="(> 240)"
  const normalGlucose ="(70-100)"
  const increaseGlucose ="(100-125)"
  const riskyGlucose ="(> 125)"

    useEffect( () => {
        const fetchText = async () => {
            const response = await axios.get('http://localhost:5000/api/language/form', {params: {language}});
            const fullText = await response.data.content
            const text = fullText.split('\n')
            setTitle(text[0]);
            setDateOfBirthLabel(text[1]);
            setGenderLabel(text[2]);
            setMaleLabel(text[3]);
            setFemaleLabel(text[4]);
            setHeightLabel(text[5]);
            setWeightLabel(text[6]);
            setSysLabel(text[7]);
            setDiaLabel(text[8]);
            setCholesterolLabel(text[9]);
            setGlucoseLabel(text[10]);
            setNormalLabel(text[11]);
            setIncreasedLabel(text[12]);
            setRiskyLabel(text[13]);
            setSmokeLabel(text[14]);
            setAlcoholLabel(text[15]);
            setPhysicalLabel(text[16]);
            setYesLabel(text[17]);
            setNoLabel(text[18]);
            setButtonLabel(text[19]);

            setNotCompletedDOB(text[20]);
            setIncorrectDOB(text[21]);
            setNotCompletedGender(text[22]);
            setNotCompletedHeight(text[23]);
            setIncorrectHeight(text[24]);
            setNotCompletedWeight(text[25]);
            setIncorrectWeight(text[26]);
            setNotCompletedSys(text[27]);
            setIncorrectSys(text[28]);
            setNotCompletedDia(text[29]);
            setNotCompletedCholesterol(text[30]);
            setNotCompletedGlucose(text[31]);
            setIncorrectDia(text[32]);
            setNotCompletedSmoke(text[33]);
            setNotCompletedAlcohol(text[34]);
            setNotCompletedPhysical(text[35]);
        }
        fetchText()
    }, [language])


  const checkData = async () => {
      var msg = '';
      if (dateOfBirth.getFullYear() === new Date().getFullYear() && dateOfBirth.getMonth() === new Date().getMonth() && dateOfBirth.getDate() === new Date().getDate())
          msg += notCompletedDOB+"\n";
      else if (dateOfBirth.valueOf() - Date.now() > 0)
            msg += incorrectDOB+"\n";
      if (gender == 0)
          msg += notCompletedGender+"\n";
      if (height == 0)
          msg += notCompletedHeight+"\n";
      else if (height < 0)
          msg += incorrectHeight+"\n";
      if (weight == 0)
          msg += notCompletedWeight+"\n";
      else if (weight < 0)
          msg += incorrectWeight+"\n";
      if (sys == 0)
          msg += notCompletedSys+"\n";
      else if (sys < 0)
          msg += incorrectSys+"\n";
      if (dia == 0)
          msg += notCompletedDia+"\n";
      else if (dia < 0)
          msg += incorrectDia+"\n";
      if (cholesterol == -1)
          msg += notCompletedCholesterol+"\n";
      if (glucose == -1)
          msg += notCompletedGlucose+"\n";
      if (smoke == -1)
          msg += notCompletedSmoke+"\n";
      if (alcohol == -1)
          msg += notCompletedAlcohol+"\n";
      if (physical == -1)
          msg += notCompletedPhysical+"\n";
      setMessage(msg)
      if (msg === "") {
          var age = Date.now()-dateOfBirth.valueOf()
          age = age * 1.1574 * 0.00000001
          age = Math.trunc(age)
          const response = await axios.get('http://localhost:5000/api/result', {params: {age, gender, height, weight, sys, dia, cholesterol, glucose, smoke, alcohol, physical}});
          const result = response.data.result
          const formData = new FormInfo(dateOfBirth,gender,height,weight,sys,dia,cholesterol,glucose,smoke,alcohol,physical,result);
          history.push("/result", [formData, language])

      }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButton fill="clear" size="small" onClick={() => setLanguage("en")}>
                <img src="../images/englishFlag.jpg" width={80} height={40} alt="enFlag"/>
            </IonButton>
            <IonButton fill="clear" size="small" onClick={() => setLanguage("ro")}>
                <img src="../images/romanianFlag.png" width={80} height={40} alt="roFlag"/>
            </IonButton>
          <IonTitle class="ion-text-center">{title}</IonTitle>
            <IonButton color="dark" slot="end" onClick={() => {history.push("/login", language)}}>Login Admin</IonButton>
        </IonToolbar>
      </IonHeader>
        <IonContent fullscreen >
            <IonHeader collapse="condense">
            </IonHeader>
            <IonList class="scroll-content">
                <IonLabel>{dateOfBirthLabel}:</IonLabel>
                <IonDatetime class="date-time-container" presentation="date"
                             onIonChange={e => {let val = e.detail.value; setDateOfBirth(new Date(val ? (Array.isArray(val) ? val[0]: val) : '')) }}/><br/>
                <IonLabel>{genderLabel}:</IonLabel><br/>
                <IonRadioGroup allowEmptySelection={false} onIonChange={e => setGender(e.detail.value)}>
                    <IonRadio value={2}>{maleLabel}</IonRadio><br/>
                    <IonRadio value={1}>{femaleLabel}</IonRadio><br/><br/>
                </IonRadioGroup>
                <IonLabel>{heightLabel} (cm):</IonLabel>
                <IonInput type="number" value={height} onIonChange={e => setHeight(parseInt(e.detail.value || '0'))}/><br/>
                <IonLabel>{weightLabel} (kg):</IonLabel>
                <IonInput type="number" value={weight} onIonChange={e => setWeight(parseInt(e.detail.value || '0'))}/><br/>
                <IonLabel>{sysLabel}:</IonLabel>
                <IonInput type="number" value={sys} onIonChange={e => setSys(parseInt(e.detail.value || '0'))}/><br/>
                <IonLabel>{diaLabel}:</IonLabel>
                <IonInput type="number" value={dia} onIonChange={e => setDia(parseInt(e.detail.value || '0'))}/><br/>
                <IonLabel>{cholesterolLabel}:</IonLabel><br/>
                <IonRadioGroup allowEmptySelection={false} onIonChange={e => setCholesterol(e.detail.value)}>
                    <IonRadio value={1}>{normalLabel} {normalCholesterol}</IonRadio><br/>
                    <IonRadio value={2}>{increasedLabel} {increasedCholesterol}</IonRadio><br/>
                    <IonRadio value={3}>{riskyLabel} {riskyCholesterol}</IonRadio><br/><br/>
                </IonRadioGroup>
                <IonLabel>{glucoseLabel}:</IonLabel><br/>
                <IonRadioGroup allowEmptySelection={false} onIonChange={e => setGlucose(e.detail.value)}>
                    <IonRadio  value={1}>{normalLabel} {normalGlucose}</IonRadio><br/>
                    <IonRadio  value={2}>{increasedLabel} {increaseGlucose}</IonRadio><br/>
                    <IonRadio  value={3}>{riskyLabel} {riskyGlucose}</IonRadio><br/><br/>
                </IonRadioGroup>
                <IonLabel>{smokeLabel}?</IonLabel><br/>
                <IonRadioGroup allowEmptySelection={false} onIonChange={e => setSmoke(e.detail.value)}>
                    <IonRadio value={1}>{yesLabel}.</IonRadio><br/>
                    <IonRadio value={0}>{noLabel}.</IonRadio><br/><br/>
                </IonRadioGroup>
                <IonLabel>{alcoholLabel}?</IonLabel><br/>
                <IonRadioGroup allowEmptySelection={false} onIonChange={e => setAlcohol(e.detail.value)}>
                    <IonRadio value={1}>{yesLabel}.</IonRadio><br/>
                    <IonRadio value={0}>{noLabel}.</IonRadio><br/><br/>
                </IonRadioGroup>
                <IonLabel>{physicalLabel}?</IonLabel><br/>
                <IonRadioGroup allowEmptySelection={false} onIonChange={e => setPhysical(e.detail.value)}>
                    <IonRadio value={1}>{yesLabel}.</IonRadio><br/>
                    <IonRadio value={0}>{noLabel}.</IonRadio><br/><br/>
                </IonRadioGroup>
                <IonButton id="datasent" color="dark" onClick={() => checkData()}>{buttonLabel}</IonButton>
                <IonModal isOpen={!!message} className="linebreak" onDidDismiss={() => setMessage('')}>
                    <div>{message}</div>
                </IonModal>
            </IonList>
    </IonContent>
</IonPage>
)
    ;
};

export default Home;
