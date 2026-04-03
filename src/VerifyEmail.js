import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function VerifyEmail() {
  const [message, setMessage] = useState("");
  const query = useQuery();
  const token = query.get("token");

  useEffect(() => {
    if (token) {
      axios.get(`https://pneuexpress.online/api/verify-email.php?token=${token}`)
        .then(res => setMessage(res.data))
        .catch(() => setMessage("Verification failed"));
    }
  }, [token]);

  return <div>{message}</div>;
}

export default VerifyEmail;
