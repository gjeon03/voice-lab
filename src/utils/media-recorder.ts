export const createMediaRecorder = async (
  onStop: () => void
): Promise<MediaRecorder | null> => {
  if (!navigator.mediaDevices?.getUserMedia) {
    console.error("getUserMedia not supported on your browser!");
    return null;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.onstop = () => {
      stream.getTracks().forEach((track) => track.stop());
      onStop();
    };

    return recorder;
  } catch (error) {
    console.error("Error accessing microphone:", error);
    return null;
  }
};
