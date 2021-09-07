import React, {useState,} from 'react'
import ModalVideo from 'react-modal-video'





const Video = ({id}) => {
    const [isOpen, setOpen] = useState(false)



    return (
        <div >
            <React.Fragment >
               <div className='video'>
                   <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={id} onClose={() => setOpen(false)}/>
                   <button className="btn-primary" onClick={() => setOpen(true)}>Video</button>
               </div>
            </React.Fragment>


        </div>
    )
}

export default Video