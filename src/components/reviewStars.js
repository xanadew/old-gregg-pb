import React from 'react';

export function starz(){
    if ({props.places[props.selectedPlace].rating}){
        let ratingHtml = '';
        for (var i = 0;i<5;i++){
            if ({props.places[props.selectedPlace].rating} < (i + 0.5)) {
                ratingHtml += '&#10025;';
            } else {
                ratingHtml += '&#10029;';
            }
            document.getElementById('iw-rating-row').style.display = '';
            document.getElementById('iw-rating').innerHTML = ratingHtml;
            }
          } else {
            document.getElementById('iw-rating-row').style.display = 'none';
          }
  
        }
    }
}