import {RouteComponentProps} from "react-router";
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import {IonButton, IonContent, IonInput, IonModal, IonPage, IonToast} from "@ionic/react";
import axios from "axios";
import '../css/Login.css';
import {language} from "ionicons/icons";

const Login: React.FC<RouteComponentProps> = ({history, location}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');

    const [usernameLabel, setUsernameLabel] = useState("Numele de utilizator");
    const [passwordLabel, setPasswordLabel] = useState("Parola");

    const [message, setMessage] = useState("");
    const [usernameMissingMessage, setUsernameMissingMessage] = useState("");
    const [passwordMissingMessage, setPasswordMissingMessage] = useState("");
    const [accountDoesNotExistMessage, setAccountDoesNotExistMessage] = useState("");

    useEffect(() => {
        const language = location.state as string
        const fetchText = async () => {
            const response = await axios.get('http://localhost:5000/api/language/login', {params: {language}});
            const fullText = await response.data.content
            const text = fullText.split('\n')
            setUsernameLabel(text[0]);
            setPasswordLabel(text[1]);
            setUsernameMissingMessage(text[2]);
            setPasswordMissingMessage(text[3]);
            setAccountDoesNotExistMessage(text[4]);
        }
        fetchText()
    }, [])

    const login = async () => {
        let msg = ""
        if (username === "")
            msg += usernameMissingMessage+" "
        if (password === "")
            msg += passwordMissingMessage
        setMessage(msg)
        if (msg === "") {
            axios.post('http://localhost:5000/api/login', {
                username: username,
                password: password
            })
                .then(res => {history.push("/admin", [res.data.token, location.state])})
                .catch(err => {setMessage(accountDoesNotExistMessage)})
        }
    }
    return (
        <IonPage>
            <IonContent>
                <IonInput type="text" label={usernameLabel+":"} fill="outline" color="dark" value={username} onIonChange={(e) => setUsername(e.detail.value || '')}/>
                <IonInput type="password" label={passwordLabel+":"} fill="outline" color="dark" value={password} onIonChange={(e) => setPassword(e.detail.value || '')}/>
                <IonButton className="centering" color="dark" onClick={() => login()}>Login</IonButton>
                <IonToast color="dark" isOpen={!!message} message={message}>A</IonToast>
            </IonContent>
        </IonPage>
    )
}

export default Login;