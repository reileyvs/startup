import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export function Browse() {
    const [haircuts, setHaircuts] = React.useState([]);
    React.useEffect(() => {
        setHaircuts(localStorage.getItem("element"));
        var arr = haircuts;
        if(arr){
            arr = arr.reverse();
            if(arr.length > 12) {
                arr.length = 12;
            }
            setHaircuts(arr);
            arr.forEach(element => {
                doc.insertAdjacentHTML('beforeend', element);
            });
        }

    });
  return (
    <main className='container-fluid text-center'>
      <div className="row" id="haircuts">{haircuts}
      </div>
      <hr />
    </main>
  );
}