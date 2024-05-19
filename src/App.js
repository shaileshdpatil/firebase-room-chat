import {useEffect, useState} from "react";
import {db} from "./firebase-config";
import {addDoc,collection,serverTimestamp,query,where,onSnapshot} from "firebase/firestore";

export default function App() {
  const roomId = window.location.pathname.replace("/","")
  const roomInfo = collection(db,roomId);
  const [loading, setLoading] = useState(false);
  let [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryMessages = query(roomInfo,where("room","==",roomId))
    onSnapshot(queryMessages,(snapshot)=>{
      let messages = []
      snapshot.forEach((doc)=>{
        messages.push({...doc.data(),id:doc.id})
      })
      setMessages([...messages])
    })
  }, []);

  function ScrollBottom() {
    let allMatchedElements = document.getElementById('chat');
    allMatchedElements.scrollTop = (allMatchedElements.scrollHeight - allMatchedElements.clientHeight) + 1;
  }

  const getRes = async (e) => {
    e.preventDefault()
    ScrollBottom()
    setValue("");
    setLoading(false);
    await addDoc(roomInfo, {
      message:value,
      user:"shailesh Patil",
      room:roomId,
      createdAt:serverTimestamp(),
    })
  };
  return (
      <div className="App">
        <div className="container">
          <div className="header">
            <img src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png" alt="" className="avatar"/>
            <h3>Room {roomId}</h3>
          </div>
          <div id="chat" className="chat">
            {/*response*/}
            {/*sender*/}
            {messages.map((item,index)=>(
                <div className={`message response`} key={index}>
                  {item.message}
                </div>
            ))}
            {loading && (
                <div className="message response">
                  <i className="fa-solid fa-ellipsis"/>
                </div>
            )}
          </div>

          <form style={{display: "contents"}} onSubmit={getRes}>
            <input
                disabled={loading}
                type="text"
                id="jokeBtn"
                className="btn"
                placeholder={loading ? "Please Wait" : "Can you tell me a How can i Help you With?"}
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />
          </form>
        </div>
      </div>
  );
}