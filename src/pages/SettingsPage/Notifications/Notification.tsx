import React, { useState, useContext, ChangeEvent } from "react";
import RightSidebar from "../SettingLeftSide";
import notiStyles from "./Notification.module.css";
import { ThemeContext } from "../../../contexts/ThemeContext.jsx";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Notifications: React.FC = () => {
  const { toggleTheme, currentTheme, themes } = useContext(ThemeContext);
  const theme = themes[currentTheme];
  const storage = getStorage();

  const [soundFile, setSoundFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [selectedSound, setSelectedSound] = useState<string>("");

  const soundOptions = [
    {
      id: "sound1",
      label: "Default",
      url: "https://firebasestorage.googleapis.com/v0/b/digital-dragon-communication.appspot.com/o/sounds%2Frhea.mp3?alt=media&token=b750b51d-ada8-4649-a4b4-1898661957e4"
    },
    {
      id: "sound2",
      label: "Arabian Mystery",
      url: "https://firebasestorage.googleapis.com/v0/b/digital-dragon-communication.appspot.com/o/sounds%2Farabian-mystery-harp-notification-2489.wav?alt=media&token=e528ab8d-08ff-46f3-b1e1-d3b2ef4516b4"
    },
    {
      id: "sound3",
      label: "Atm Cash",
      url: "https://firebasestorage.googleapis.com/v0/b/digital-dragon-communication.appspot.com/o/sounds%2Fatm-cash-machine-key-press-2841.wav?alt=media&token=d81b103d-9cc4-4a49-a94a-12fb2b4ddd83"
    },
    {
      id: "sound4",
      label: "Bell",
      url: "https://firebasestorage.googleapis.com/v0/b/digital-dragon-communication.appspot.com/o/sounds%2Fbell-notification-933.wav?alt=media&token=91e0bfbf-c257-4038-9d6b-f9b74abdff5d"
    },
    {
      id: "sound5",
      label: "Bubble",
      url: "https://firebasestorage.googleapis.com/v0/b/digital-dragon-communication.appspot.com/o/sounds%2Fbubble.wav?alt=media&token=21b21de0-12fe-4d70-9bfb-e19a01427390"
    },
    {
      id: "sound6",
      label: "Doorbell",
      url: "https://firebasestorage.googleapis.com/v0/b/digital-dragon-communication.appspot.com/o/sounds%2Fdoorbell-single-press-333.wav?alt=media&token=e0859bb6-6620-4179-9ebc-e68d653f3a97"
    },
    {
      id: "sound7",
      label: "Software Interface",
      url: "https://firebasestorage.googleapis.com/v0/b/digital-dragon-communication.appspot.com/o/sounds%2Fsoftware-interface-remove-2576.wav?alt=media&token=e4d56613-2a21-402b-948d-a1ccd37985ea"
    },
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSoundFile(e.target.files[0]);
    }
  };

  const handleUploadSound = async () => {
    if (!soundFile) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const storageRef = ref(storage, `sounds/${soundFile.name}`);

    try {
      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, soundFile);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // You can now use the download URL as needed (e.g., save it in Firestore or play the sound)
      console.log("File uploaded successfully:", downloadURL);
      setUploadStatus("File uploaded successfully!");

      // For demonstration, let's play the uploaded sound
      const audio = new Audio(downloadURL);
      audio.play();
    } catch (err) {
      console.error("Error uploading file:", err);
      setUploadStatus("Error uploading file. Please try again.");
    }
  };

  const handleSoundSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedSoundUrl = e.target.value;
    setSelectedSound(selectedSoundUrl);

    // Play the selected sound
    const audio = new Audio(selectedSoundUrl);
    audio.play();
  };

  return (
    <div className={notiStyles.container1_notification}>
      <RightSidebar />

      <div className={notiStyles.notification_section}>
        <div className={notiStyles.header} style={{ background: theme.bgd }}>
          <h1 className={notiStyles.header1}>Notification</h1>
        </div>
        <div className={notiStyles.notification_content}>
          <strong>Text Tone</strong>
          <div className={notiStyles.sound_options}>
            {soundOptions.map((sound) => (
              <div key={sound.id} className={notiStyles.sound_option}>
                <input 
                  type="radio" 
                  id={sound.id} 
                  name="sound" 
                  value={sound.url} 
                  onChange={handleSoundSelection} 
                />
                <label htmlFor={sound.id}>{sound.label}</label>
              </div>
            ))}
          </div>
          <input type="file" accept="audio/*" onChange={handleFileChange} />
          <button onClick={handleUploadSound}>Upload Sound</button>
          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
