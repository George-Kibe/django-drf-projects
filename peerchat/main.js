console.log("Javascript file loaded");
let APP_ID="5c0b4f15af304f2a95bc442f710580ff";
let token = null;
let uid = String(Math.floor(Math.random() * 10000));

let client;
let channel;

let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers: [
        {
            urls: ["stun:stun.services.mozilla.com", "stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302", "stun:stun3.l.google.com:19302", "stun:stun4.l.google.com"]
        }
    ]
}

let init = async () => {
    client  = await AgoraRTM.createInstance(APP_ID);
    await client.login({uid, token});

    // index.html?room=454346664
    channel = client.createChannel("main");
    await channel.join();
    channel.on("MemberJoined", handleJoined);
    channel.on("MessageFromPeer", handleMessageFromPeer);
    channel.on("MemberLeft", handleLeft);
    channel.on("Message", handleMessage);

    localStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
    });
    document.getElementById("user-1").srcObject = localStream;
}

let handleJoined = async (memberId) => {

    console.log("A new user Joined the Channel", memberId);
    createOffer(memberId);
}
let handleMessageFromPeer = async (message, memberId) => { 
    console.log("Handling Message from Peer");
    message = JSON.parse(message.text);
    if(message.type === 'offer') {
        createAnswer(memberId, message.offer);
    }
    if(message.type === 'answer') {
        addAnswer(message.answer);
    }
    if(message.type === 'candidate') {
        if(peerConnection){
            peerConnection.addIceCandidate(message.candidate);
        }
    }
}

let handleLeft = async () => {
    console.log("Left Channel");
}

let handleMessage = async (message) => {

}

let createPeerConnection = async (memberId) => {
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();
    document.getElementById("user-2").srcObject = remoteStream;

    if(!localStream){
        localStream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        });
        document.getElementById("user-1").srcObject = localStream;
    }

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    })

    peerConnection.ontrack = async (event) => {
        event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
        })
    }
    peerConnection.onicecandidate = async (event) => {
        if(event.candidate) {
            client.sendMessageToPeer({ text: JSON.stringify({'type': 'candidate', 'candidate': event.candidate})}, memberId)
            // console.log("New Ice Candidate: ", event.candidate);
            return;
        }
    }
}


let createOffer = async (memberId) => {
    await createPeerConnection(memberId);

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // console.log("Offer: ", offer);
    client.sendMessageToPeer({ text: JSON.stringify({'type': 'offer', 'offer': offer})}, memberId);
}

let createAnswer = async (memberId, offer) => {
    await createPeerConnection(memberId);

    await peerConnection.setRemoteDescription(JSON.parse(message.text).offer);

    let answer  = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    client.sendMessageToPeer({ text: JSON.stringify({'type': 'answer', 'answer': answer})}, memberId);
}

let addAnswer = async (answer) => {
    if(!peerConnection.currentRemoteDescription) {
        peerConnection.setRemoteDescription(answer);
    }
}

init()