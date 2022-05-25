import './Counter.css'

function Counter(props){
    return (
        <div className='center-screen padding-from-top'>
           <div className='counter'>
               <div className='team'>
                   <img src="https://i.pinimg.com/originals/ab/11/80/ab11809f6fb312e75649e7b45f5b51ab.jpg" />
                   Faze Clan
               </div>
               <div className='scores'>
                    <div>
                        {props.teams.ct_score}
                    </div>
                        <div>
                            {props.phase.phase_ends_in}
                        </div>
                    <div>
                        {props.teams.t_score}
                    </div>
               </div>
               <div className='team justify-right'>
                   Natus Vincere
                   <img src="https://64.media.tumblr.com/0e77b2c50894e1395215e989f0269d78/ec40488cc0643c83-39/s500x750/c650a684dff6da1dfd6eceab4364dd80112f828f.png"/>
               </div>
            </div> 
        </div>
    )
}

export default Counter