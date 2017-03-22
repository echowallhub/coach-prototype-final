function beCoachApi(id, data){
  return fetch('http://dev.syudo.site/account/'+id, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify(data)
  });
}

export function beCoachAction(id, data){
  return function(dispatch){
    return beCoachApi(id, data).then(res => {
      dispatch(beCoachSuccess());
    })
  }
}

function beCoachSuccess(){
  return {
    type: 'BE_COACH'
  }
}
