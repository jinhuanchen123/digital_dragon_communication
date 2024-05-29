import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

interface AutoDownloadMediaProps {
  userId: string;
}

const AutoDownloadMedia: React.FC<AutoDownloadMediaProps> = ({ userId }) => {
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [textContent, setTextContent] = useState<string>('');

  useEffect(() => {
    const fetchMediaUrls = async () => {
      try {
        const firestore = getFirestore();
        const textFilesCollection = collection(firestore, `text_channels`);
        const querySnapshot = await getDocs(textFilesCollection);

        const urls: string[] = [];
        const textContents: string[] = [];

        querySnapshot.forEach((doc) => {
          const textFileData = doc.data();
          const text = textFileData.content || ''; 
          const urlsInText = extractUrls(text);

          if (urlsInText.length > 0) {
            urls.push(...urlsInText);
          } else {
            textContents.push(text);
          }
        });

        setMediaUrls(urls);
        setTextContent(textContents.join('\n\n'));
      } catch (error) {
        console.error('Error fetching media URLs:', error);
      }
    };

    fetchMediaUrls();
  }, [userId]);

  const extractUrls = (text: string): string[] => {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };

  const handleDownloadMedia = async (mediaUrl: string) => {
    try {
      // Fetch media file
      const response = await fetch(mediaUrl);
      const blob = await response.blob();

      // Create a temporary anchor element to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `media_${Date.now()}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading media:', error);
      console.log('cont:' + textContent)
    }
  };

  return (
    <div>
      {mediaUrls.length > 0 ? (
        mediaUrls.map((mediaUrl, index) => (
          <button key={index} onClick={() => handleDownloadMedia(mediaUrl)}>
            Download Media {index + 1}
          </button>
        ))
      ) : (
        <div>
                        

          {textContent ? (
            <div>
              <p>No media available. Showing text content:</p>
              <pre>{textContent}</pre>
            </div>
          ) : (
            <p>No media or text available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoDownloadMedia;
