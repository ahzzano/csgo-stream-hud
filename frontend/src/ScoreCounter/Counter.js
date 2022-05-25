import './Counter.css'

function Counter(props){
    return (
        <div className='center-screen padding-from-top'>
           <div className='counter'>
               <div>
                   Faze Clan
               </div>
               <div>
                   {props.teams.ct_score}
               </div>
                <div>
                    Timer
                </div>
               <div>
                   {props.teams.t_score}
               </div>
               <div>
                   Natus Vincere
               </div>
            </div> 
        </div>
    )
}

export default Counter