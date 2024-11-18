import React, { useState } from 'react';
import axios from 'axios';

function AccountRecovery() {
  const [userId, setUserId] = useState("");

  const handleRecover = async () => {
    try {
      const response = await axios.post('http://localhost:5000/recover_account', { user_id: userId });
      alert(response.data.message);
    } catch (error) {
      alert("Account recovery failed or recovery period expired.");
    }
  };

  return (
    <div className="account-recovery">
      <input 
        type="text" 
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter your User ID for recovery"
      />
      <button onClick={handleRecover}>Recover Account</button>
    </div>
  );
}

export default AccountRecovery;
