import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import parse from 'html-react-parser';

export function Browse() {
    var haircuts = [];
      const el = localStorage.getItem('element');
        haircuts = JSON.parse(el);
        if(haircuts){
            haircuts = haircuts.reverse();
            
            if(haircuts.length > 12) {
                haircuts.length = 12;
            }
            var list;
            haircuts.forEach(element => {
              list = element + list;
            });
        }
  return (
    <main className='container-fluid text-center'>
      <div className="row" id="haircuts">{parse(list)}
      </div>
      <hr />
    </main>
  );
}