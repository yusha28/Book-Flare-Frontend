import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function ExchangeRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/exchange/requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error.message);
        toast.error('Failed to fetch requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleUpdateRequest = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/exchange/requests/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update request status');
      }

      toast.success(`Request ${status.toLowerCase()} successfully`);
      setRequests((prev) =>
        prev.filter((request) => (status === 'Accepted' ? request.id !== id : true))
      );
    } catch (error) {
      console.error('Error updating request status:', error.message);
      toast.error('Failed to update request');
    }
  };

  if (loading) {
    return <h2>Loading requests...</h2>;
  }

  return (
    <div>
      <h2>Exchange Requests</h2>
      {requests.length > 0 ? (
        <ul>
          {requests.map((request) => (
            <li key={request._id}>
              <p>
                <strong>Requested Book:</strong> {request.requestedBookID.title}
              </p>
              <p>
                <strong>Offered Book:</strong> {request.offeredBookID.title}
              </p>
              <button onClick={() => handleUpdateRequest(request._id, 'Accepted')}>
                Accept
              </button>
              <button onClick={() => handleUpdateRequest(request._id, 'Declined')}>
                Decline
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No requests found</p>
      )}
    </div>
  );
}

export default ExchangeRequests;
