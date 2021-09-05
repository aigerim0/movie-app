import React, {useState,useEffect} from 'react'
import ModalVideo from 'react-modal-video'
import axios from "axios";
import {useParams} from "react-router-dom";




const Video = ({id}) => {
    const [isOpen, setOpen] = useState(false)



    return (
        <div>
            <React.Fragment>
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={id} onClose={() => setOpen(false)}/>
                <button className="btn-primary" onClick={() => setOpen(true)}>Video</button>
            </React.Fragment>


        </div>
    )
}

export default Video