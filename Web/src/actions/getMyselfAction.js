
function getMyselfApi(id){
  return fetch('http://dev.syudo.site/account/'+id);
}

export function getMyselfAction(id){
  return function(dispatch){
    return getMyselfApi(id).then(res => {
      return res.json()
    }).then(data => {
      dispatch(getMyselfSuccess(data))
    })
  }
}

function getMyselfSuccess(data){
  return {
    type: 'MYSELF',
    user: data
  }
}
