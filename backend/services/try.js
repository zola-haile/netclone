import { useEffect, useState } from 'react';

function VisitorLogger() {
  const [visitorInfo, setVisitorInfo] = useState(null);

  useEffect(() => {
    // 1. Fetch the visitor's IP and location data
    fetch('https://ipapi.co')
      .then(res => res.json())
      .then(data => {
        setVisitorInfo(data);
        // 2. Here you would typically send 'data' to your database
        console.log("Visitor Data Captured:", data);
      });
  }, []);

  return (
    <div>
      {visitorInfo ? (
        <p>Hello! Your IP is {visitorInfo.ip} and you are in {visitorInfo.city}.</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
