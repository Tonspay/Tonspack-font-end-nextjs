  
import "../styles/loading.module.css";
export const Loading = () => {
  
return (
    <div id="loading_mask" style={{position: 'absolute', zIndex: '999',backgroundColor: '#000000', width: '95%', height: '90%'}}>
        <div className="load" style={{marginTop:"-20%"}}>
        <hr/><hr/><hr/><hr/>
        </div>
    </div>

    );
  };
  