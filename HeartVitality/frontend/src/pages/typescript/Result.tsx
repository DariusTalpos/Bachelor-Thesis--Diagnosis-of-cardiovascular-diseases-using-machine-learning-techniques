import {RouteComponentProps} from "react-router";
import {IonButton, IonContent, IonInput, IonLabel, IonPage, IonText} from "@ionic/react";
import {jsPDF} from "jspdf";
import Home from "./Home";
import {useEffect, useState} from "react";
import {FormInfo} from "../../classes/FormInfo";
import axios from "axios";
import {language} from "ionicons/icons";

const Result: React.FC<RouteComponentProps> = ({history, location}) => {

    const [positiveResultText, setPositiveResultText] = useState("Rezultatul" +
        " obținut de model este unul pozitiv. Există așadar riscul să suferiți de o boală cardiovasculară.");
    const [negativeResultText, setNegativeResultText] = useState("Rezultatul" +
        " obținut de model este unul negativ. Nu există așadar riscul să suferiți de o boală cardiovasculară.");
    const [standardText, setStandardText] = useState("Rezultatele furnizate" +
        " nu sunt întotdeauna corecte. Pentru a elimina orice suspiciune vă recomandăm un control medical realizat de " +
        "un medic cardiolog specializat.");
    const [surname, setSurname] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [surnameLabel, setSurnameLabel] = useState("Prenume");
    const [familyNameLabel, setFamilyNameLabel] = useState("Nume de familie");
    const [buttonText, setButtonText] = useState("Descărcare rezultat");

    const [title, setTitle] = useState("");
    const [nameText, setNameText] = useState("");
    const [dateOfBirthText, setDateOfBirthText] = useState("Data nașterii");
    const [genderText, setGenderText] = useState("Sexul");
    const [maleText, setMaleText] = useState("Masculin");
    const [femaleText, setFemaleText] = useState("Feminin");
    const [heightText, setHeightText] = useState("Înălțimea");
    const [weightText, setWeightText] = useState("Greutatea");
    const [sysText, setSysText] = useState("Tensiunea sistolică (mare)");
    const [diaText, setDiaText] = useState("Tensiunea diastolică (mică)");
    const [cholesterolText, setCholesterolText] = useState("Nivelul de colesterol");
    const [glucoseText, setGlucoseText] = useState("Nivelul de glucoză");
    const [normalText, setNormalText] = useState("Normal");
    const [increasedText, setIncreasedText] = useState("Ridicat");
    const [riskyText, setRiskyText] = useState("Riscant");
    const [smokeText, setSmokeText] = useState("Sunteți un fumător activ");
    const [alcoholText, setAlcoholText] = useState("Consumați alcool des");
    const [physicalText, setPhysicalText] = useState("Sunteți o persoană activă");
    const [yesText, setYesText] = useState("da");
    const [noText, setNoText] = useState("nu");
    const [result, setResult] = useState("Rezultat");
    const [positiveText, setPositiveText] = useState("pozitiv")
    const [negativeText, setNegativeText] = useState("negativ")
    const [whenText, setWhenText] = useState("Realizat la data de")
    const [docTitle, setDocTitle] = useState("Rezultat_formular");
    let formInfo: FormInfo;
    if(location.state)
    {
        const info = location.state as Array<any>;
        formInfo = info[0];
    }


    useEffect( () => {
            if(!location.state)
            {
                history.push("/home")
                return
            }
            else {
                const info = location.state as Array<any>;
                let language = info[1];
                const fetchText = async () => {
                    const response = await axios.get('http://localhost:5000/api/language/result', {params: {language}});
                    const fullText = await response.data.content
                    const text = fullText.split('\n')
                    setPositiveResultText(text[0]);
                    setNegativeResultText(text[1]);
                    setStandardText(text[2]);
                    setSurnameLabel(text[3]);
                    setFamilyNameLabel(text[4]);
                    setButtonText(text[5]);
                    setTitle(text[6]);
                    setDateOfBirthText(text[7]);
                    setGenderText(text[8]);
                    setMaleText(text[9]);
                    setFemaleText(text[10])
                    setHeightText(text[11]);
                    setWeightText(text[12]);
                    setSysText(text[13]);
                    setDiaText(text[14]);
                    setCholesterolText(text[15]);
                    setGlucoseText(text[16]);
                    setNormalText(text[17]);
                    setIncreasedText(text[18]);
                    setRiskyText(text[19]);
                    setSmokeText(text[20]);
                    setAlcoholText(text[21]);
                    setPhysicalText(text[22]);
                    setYesText(text[23]);
                    setNoText(text[24]);
                    setResult(text[25]);
                    setPositiveText(text[26]);
                    setNegativeText(text[27]);
                    setWhenText(text[28]);
                    setDocTitle(text[29]);
                    setNameText(text[30]);
                }
                fetchText()
            }
    }, [])

    const formatDate = (date: Date) => {
        let day = date.getDate().toString();
        let month = (date.getMonth()+1).toString();
        let year = date.getFullYear().toString();
        if (day.length == 1)
            day = "0" + day;
        if (month.length == 1)
            month = "0" + month;
        return day+"."+month+"."+year;
    }

    const formatTime = (date: Date) => {
        let hour = date.getHours().toString();
        let minute = date.getMinutes().toString();
        if (hour.length == 1)
            hour = "0"+date.getHours();
        if (minute.length == 1)
            minute = "0"+date.getMinutes();
        return hour+":"+minute;
    }


    const generateDocument = () => {
        const doc = new jsPDF()
        const docWidth = doc.internal.pageSize.getWidth();
        const titleWidth = doc.getTextWidth(title)
        const x = (docWidth - titleWidth) / 2;
        doc.text(title, x, 7)
        const space = 20;
        doc.text(nameText+": "+surname+" "+familyName,10,25+space)
        doc.text(dateOfBirthText+": "+formatDate(formInfo.dateOfBirth),10,35+space)
        if(formInfo.gender === 1)
            doc.text(genderText+": "+femaleText,10,45+space)
        else
            doc.text(genderText+": "+maleText,10,45+space)
        doc.text(heightText+": "+formInfo.height+" cm",10,55+space)
        doc.text(weightText+": "+formInfo.weight+" kg",10,65+space)
        doc.text(sysText+": "+formInfo.sys,10,75+space)
        doc.text(diaText+": "+formInfo.dia,10,85+space)
        switch (formInfo.cholesterol)
        {
            case 1: doc.text(cholesterolText+": "+normalText,10,95+space); break;
            case 2: doc.text(cholesterolText+": "+increasedText,10,95+space); break;
            case 3: doc.text(cholesterolText+": "+riskyText,10,95+space); break;
        }
        switch (formInfo.glucose)
        {
            case 1: doc.text(glucoseText+": "+normalText,10,105+space); break;
            case 2: doc.text(glucoseText+": "+increasedText,10,105+space); break;
            case 3: doc.text(glucoseText+": "+riskyText,10,105+space); break;
        }
        if(formInfo.smoke === 0)
            doc.text(smokeText+": "+noText,10,115+space);
        else
            doc.text(smokeText+": "+yesText,10,115+space);
        if(formInfo.alcohol === 0)
            doc.text(alcoholText+": "+noText,10,125+space);
        else
            doc.text(alcoholText+": "+yesText,10,125+space);
        if(formInfo.physical === 0)
            doc.text(physicalText+": "+noText,10,135+space);
        else
            doc.text(physicalText+": "+yesText,10,135+space);
        if(formInfo.result === 0)
            doc.text(result+": "+negativeText,10,145+space);
        else
            doc.text(result+": "+positiveText,10,145+space);

        const date = new Date()
        doc.text(whenText+": "+formatDate(date)+" "+formatTime(date),10,185+space)
        doc.save(docTitle+".pdf")

    }

    return (
        <IonPage>
            <IonContent>
                {
                    formInfo && formInfo.result === 1 &&
                    <IonText>
                        {positiveResultText}
                    </IonText>
                }
                {
                    formInfo && formInfo.result === 0 &&
                    <IonText>
                        {negativeResultText}
                    </IonText>
                }
                <br/>
                <IonText>
                    {standardText}
                </IonText>
                <br/>
                <IonInput type="text" label={surnameLabel+":"} fill="outline" color="dark" value={surname}
                          onIonChange={e => setSurname(e.detail.value || '')}></IonInput>
                <IonInput type="text" label={familyNameLabel+":"} fill="outline" color="dark" value={familyName}
                          onIonChange={e => setFamilyName(e.detail.value || '')}></IonInput>
                { surname && familyName && <IonButton color="dark" onClick={() => generateDocument()}>{buttonText}</IonButton>}
            </IonContent>
        </IonPage>
    )
}

export default Result;