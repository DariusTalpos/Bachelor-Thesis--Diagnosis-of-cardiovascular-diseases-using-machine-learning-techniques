# Bachelor Thesis: Diagnosis of cardiovascular diseases using machine learning techniques

<p><b>EN</b>: This repository contains my Bachelor's Thesis, titled "Diagnosis of cardiovascular diseases using machine learning techniques". Its four main components are the following: </p>
<p><o1>
  <li>The Bachelor's Thesis as a PDF file (in Romanian)</li>
  <li>The presentation of the thesis as a Microsoft PowerPoint file (in Romanian)</li>
  <li>HeartVitality</li>
  <li>DefaultModelGenerator</li>
</o1></p>

<p><b>RO</b>: Acest repo conține lucrarea mea de licență intitulată ,,Diagnosticarea bolilor cardiovasculare folosind tehnici de învățare automată". Cele patru componente principale ale sale sunt următoarele: </p>
<o1>
  <li>Lucrarea de licență ca fișier PDF (în limba română)</li>
  <li>Prezentarea lucrării ca fișier Microsoft PowerPoint (în limba română)</li>
  <li>HeartVitality</li>
  <li>DefaultModelGenerator</li>
</o1>

<h2>HeartVitality</h2>
<p><b>EN: </b></p>
<p>HeartVitality is the application obtained as a result of the study performed in the thesis. It is a client-server application with the client written in TypeScript (using Ionic React) and the server written in Python (using Flask).

The main purpose of the application is to allow users to use machine learning algorithms in order to determine whether or not they possibly suffer from a cardiovascular disease based on some of their data. The main functionalities of the application are the following:
<o1>
  <li>obtaining a diagnosis based on a form containing relevant data</li>
  <li>creating a PDF file report containing both the data and the result</li>
  <li>changing the application's language in Romanian or Englsih</li>
  <li>logging in as an admin</li>
  <li>building and testing classification models (as an admin)</li>
  <li>changing the model used inside the application (as an admin)</li>
</o1>
</p>

<p><b>RO: </b></p>
<p>HeartVitality este aplicația rezultată în urma studiului realizat în lucrare. Este o aplicație client-server cu clientul scris în TypeScript (folosind Ionic React) și serverul scris în Python (folosind Flask).

Scopul principal al aplicației este de a permite utilizatorilor să folosească algoritmi de învățare automată pentru a putea determina dacă există riscul ca aceștia să sufere de o boală cardiovasculară bazat pe anumite date. Principalele funcționalități ale aplicației sunt următoarele:
<o1>
  <li>obținerea unui diagnostic bazat pe un formular care conține date relevante</li>
  <li>crearea unui raport ca fișier PDF care să conțină atât datele, cât și rezultatul</li>
  <li>schimbarea limbii aplicației în română sau engleză</li>
  <li>autentificarea ca administrator</li>
  <li>construirea și testarea de modele de clasificare (în calitate de administrator)</li>
  <li>schimbarea modelului folosit în cadrul aplicației (în calitate de administrator)</li>
</o1>
</p>

<h2>DefaultModelGenerator</h2>
<p><b>EN: </b></p>
<p>DefaultModelGenerator is a program representing a testing environment in which I compared the results of several machine learning algorithms on the data set using multiple performance metrics. The best performing model (using the Gradient Boosting algorithm and scaling as the data transformation method) is used in the HeartVitality application as the default model.
</p>
<p><b>RO: </b></p>
<p>DefaultModelGenerator este un program reprezentând un mediu de testare în care am comparat rezultatele mai multor algoritmi de învățare automată folosind multiple metrici de performanță. Cel mai eficient model (folosing algoritmul de Gradient Boosting și scalarea ca metodă de transformare a datelor) este folosit în aplicația HeartVitality ca model implicit.
</p>

<h2>Discaimer</h2>
<p><b>EN: </b></p>
<p>Some packages used in the frontend of the HeartVitality application were found to have vulnerabilities over time. As such, it is recommended not to run the application at least without updating the packages to their latest versions.</p>
<p><b>EN: </b></p>
<p>În unele pachete folosite în frontend-ul aplicației HeartVitality au fost descoperite vulnerabilități pe parcursul timpului. Ca atare, este recomandat ca aplicația să nu fie rulată fără actualizarea pachetelor la cele mai noi versiuni.</p>
