export const SUBMIT_URL =
  "https://script.google.com/macros/s/AKfycbwG7GR6KeCYJov7MdzzCwbMwFq_8U4U-EKb3GZrc_MALNGpPNFHISRG2J4KiYAzWP9Deg/exec";

export interface ApplicationData {
  name: string;
  email: string;
  instagram: string;
  age: string;
  gender: string;
  festival: string;
  festivalOther: string;
  dates: string;
  from: string;
}

export function submitApplication(data: ApplicationData) {
  return fetch(SUBMIT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
  });
}
