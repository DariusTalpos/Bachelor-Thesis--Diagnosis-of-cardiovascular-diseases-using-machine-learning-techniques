import {
    IonButton,
    IonContent, IonDatetime, IonGrid,
    IonHeader,
    IonInput, IonItem,
    IonLabel,
    IonList, IonModal,
    IonPage, IonRadio,
    IonRadioGroup,
    IonTitle,
    IonToolbar,
    IonRow, IonCol
} from '@ionic/react';
import '../css/Home.css';
import {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import axios from 'axios';
import * as fs from "fs";
import {waitFor} from "@testing-library/dom";

const Admin: React.FC<RouteComponentProps> = ({history, location}) => {

    const [title, setTitle] = useState("Antrenare și testare model de clasificare");
    const [algorithmLabel, setAlgorithmLabel] = useState("Algoritmul");
    const [transformationLabel, setTransformationLabel] = useState("Transformarea datelor");
    const [optimiseLabel, setOptimiseLabel] = useState("Optimizare");
    const [yesLabel, setYesLabel] = useState("Da");
    const [noLabel, setNoLabel] = useState("Nu");
    const [trainButton, setTrainButton] = useState("Antrenare și testare model");
    const [modelButton, setModelButton] = useState("Setare ca model utilizat în aplicație");
    const [resetButton, setResetButton] = useState("Resetare la modelul original");
    const [algorithm, setAlgorithm] = useState("");
    const [transformation, setTransformation] = useState("");0
    const [optimise, setOptimise] = useState(0);
    const [noAlgText, setNoAlgText] = useState("Nu a fost aleasă o opțiune pentru algoritm.");
    const [noTransformationText, setNoTransformationText] = useState("Nu a fost aleasă o opțiune pentru transformarea datelor.");
    const [noTuningText, setNoTuningText] = useState("Nu a fost aleasă o opțiune pentru optimizarea datelor.");
    const [notVerifiedText, setNotVerifiedText] = useState("Optimizarea datelor nu a fost verificată pentru acest algoritm.");
    const [message, setMessage] = useState("");
    const [stats, setStats] = useState(false);
    const [accuracy, setAccuracy] = useState("");
    const [TP, setTP] = useState("");
    const [FP, setFP] = useState("");
    const [TN, setTN] = useState("");
    const [FN, setFN] = useState("");
    const [logLoss, setLogLoss] = useState("");
    const [rocAUC, setRocAUC] = useState("");
    const [accuracyText, setAccuracyText] = useState("Acuratețe");
    const [confMatrixText, setConfMatrixText] = useState("Matrice de confuzie");
    const [logLossText, setLogLossText] = useState("Pierdere logaritmică");
    const [rocAUCText, setRocAUCText] = useState("Aria de sub curba ROC");


    useEffect(() => {
        try {
            const info = location.state as Array<any>
            const token = info[0];
            const checkToken = async () => {
                await axios.post('http://localhost:5000/api/token', {token}).catch(err => {history.push("/");});
            }
            checkToken()
            const language = info[1];
            const fetchText = async () => {
                const response = await axios.get('http://localhost:5000/api/language/admin', {params: {language}});
                const fullText = await response.data.content
                const text = fullText.split('\n')
                setTitle(text[0]);
                setAlgorithmLabel(text[1]);
                setTransformationLabel(text[2]);
                setOptimiseLabel(text[3]);
                setTrainButton(text[4]);
                setModelButton(text[5]);
                setResetButton(text[6]);
                setAccuracyText(text[7]);
                setConfMatrixText(text[8]);
                setLogLossText(text[9]);
                setRocAUCText(text[10]);
                setNoAlgText(text[11]);
                setNoTransformationText(text[12]);
                setNoTuningText(text[13]);
                setNotVerifiedText(text[14]);
                setYesLabel(text[15]);
                setNoLabel(text[16]);
            }
            fetchText()
        }
        catch (Exception) {
            history.push("/");
        }
    }, [])

    const check_data = async () => {
        var msg = '';
        if(algorithm === "")
            msg +=noAlgText+"\n";
        if(transformation === "")
            msg +=noTransformationText+"\n";
        if(optimise == 0 && (algorithm === "LR" || algorithm==="SVM" || algorithm==="GB" || algorithm==="AB"))
            msg +=noTuningText+"\n";
        if(optimise ==1 && (algorithm!="LR" && algorithm!="SVM" && algorithm!="GB" && algorithm!="AB"))
            msg +=notVerifiedText+"\n";
        setMessage(msg)
        if(msg==="") {
            await axios.post('http://localhost:5000/api/train', {algorithm, transformation, optimise})
                .then(res => {
                    setAccuracy(res.data.accuracy[0] + "% +/- " + res.data.accuracy[1]+"%");
                    setTP(res.data.conf_matrix[0]);
                    setFP(res.data.conf_matrix[1]);
                    setFN(res.data.conf_matrix[2]);
                    setTN(res.data.conf_matrix[3]);
                    setLogLoss(res.data.log_loss[0] + " +/- " + res.data.log_loss[1]);
                    setRocAUC(res.data.roc_auc[0] + " +/- " + res.data.roc_auc[1]);
                    setStats(true);
                })
        }

    }

    const set_model = async () => {
        await axios.get('http://localhost:5000/api/set')
    }

    const reset_model = async () => {
        await axios.get('http://localhost:5000/api/reset')
    }

    // @ts-ignore
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">{title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                <IonHeader collapse="condense">
                </IonHeader>
                <IonList class="ion-text-center">
                    <IonLabel>{algorithmLabel+":"}</IonLabel><br/>
                    <IonRadioGroup allowEmptySelection={false} onIonChange={e => setAlgorithm(e.detail.value)}>
                        <IonRadio value="LR">Logistic Regression</IonRadio><br/><br/>
                        <IonRadio value="LDA">Linear Discriminant Analysis</IonRadio><br/><br/>
                        <IonRadio value="KNN">k-Nearest Neighbors</IonRadio><br/><br/>
                        <IonRadio value="DT">Decision Tree</IonRadio><br/><br/>
                        <IonRadio value="NB">Naive Bayes</IonRadio><br/><br/>
                        <IonRadio value="SVM">Support Vector Machines</IonRadio><br/><br/>
                        <IonRadio value="AB">AdaBoost</IonRadio><br/><br/>
                        <IonRadio value="GB">Gradient Boosting</IonRadio><br/><br/>
                        <IonRadio value="RF">Random Forest</IonRadio><br/><br/>
                        <IonRadio value="ET">Extra Trees</IonRadio><br/><br/><br/>
                    </IonRadioGroup>
                    <IonLabel>{transformationLabel+":"}</IonLabel><br/>
                    <IonRadioGroup allowEmptySelection={false} onIonChange={e => setTransformation(e.detail.value)}>
                        <IonRadio value="None"> --- </IonRadio><br/><br/>
                        <IonRadio value="Standardize">StandardScaler</IonRadio><br/><br/>
                        <IonRadio value="Normalize">Normalizer</IonRadio><br/><br/>
                        <IonRadio value="Scale">MinMaxScaler</IonRadio><br/><br/>
                        <IonRadio value="Binarize">Binarizer</IonRadio><br/><br/><br/>
                    </IonRadioGroup>
                    {
                        (algorithm==="LR" || algorithm==="SVM" || algorithm ==="GB" || algorithm==="AB") &&
                        <><IonLabel>{optimiseLabel+":"}</IonLabel><br/><IonRadioGroup
                            allowEmptySelection={false} onIonChange={e => setOptimise(e.detail.value)}>
                            <IonRadio value={1}>{yesLabel}</IonRadio><br/><br/>
                            <IonRadio value={2}>{noLabel}</IonRadio><br/><br/>
                        </IonRadioGroup></>
                    }
                    <div>
                        <IonButton color="dark" onClick={() => check_data()}>
                            {trainButton}
                        </IonButton>
                        <IonButton color="dark" onClick={() => set_model()}>
                            {modelButton}
                        </IonButton>
                        <IonButton color="dark" onClick={() => reset_model()}>
                            {resetButton}
                        </IonButton>
                    </div>
                    <IonModal isOpen={!!message} className="linebreak" onDidDismiss={() => setMessage('')}>
                        <div>{message}</div>
                    </IonModal>
                </IonList>
                { stats &&
                    <IonList>
                        <IonItem>
                            {accuracyText}: {accuracy}
                        </IonItem>
                        <IonItem>
                            {confMatrixText}:
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="2">{TP}</IonCol>
                                    <IonCol size="2">{FP}</IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="2">{FN}</IonCol>
                                    <IonCol size="2">{TN}</IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem>
                            {logLossText}: {logLoss}
                        </IonItem>
                        <IonItem>
                            {rocAUCText}: {rocAUC}
                        </IonItem>
                    </IonList>}
            </IonContent>
        </IonPage>
    )
        ;
};

export default Admin;
