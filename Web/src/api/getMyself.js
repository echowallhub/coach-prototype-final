export function getMyself(id){
  fetch('http://dev.syudo.site/account/'+id).then(res => {
    return res.text()
  }).then(data => {
    let tutorials = JSON.parse(data).enrolled_tutorials;

    for(let tutorial of tutorials){
      fetch('http://dev.syudo.site/tutorial/'+tutorial).then(res => {
        return res.text()
      }).then(data => {

        this.setState({
          tutorials: [...this.state.tutorials, JSON.parse(data)]
        });
      });
    }
  });
}
