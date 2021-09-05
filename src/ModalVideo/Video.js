import React, {useState,} from 'react'
import ModalVideo from 'react-modal-video'





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