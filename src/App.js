import React from "react";
import "./App.css"

class App extends React.Component{
    constructor(props){
    super(props);
    this.state={
        isLoading:true,
        keywords:"",
        news:[]
    }
    this.handleKeyword = this.handleKeyword.bind(this);
    this.handleForm = this.handleForm.bind(this);
    }
    
    handleKeyword(e){
        this.setState({ keywords: e.target.value, isLoading:true});
        this.getNews(this.state.keywords).then(data =>
            setTimeout(
              () =>
                this.setState({
                  ...this.state,
                  news: [...data.articles],
                  isLoading: false
                }),
              2000
            )
          );
    }
    getNews(keyword){
        return fetch(
            `${process.env.API_PATH}/everything?q=${keyword}&apikey=${process.env.API_KEY}`
        )
        .then(res => res.json())
        .then(data => data)
    }
    componentDidMount(){
        this.getNews("cricket").then(data => {
            console.log(data)
            this.setState({
                ...this.state,
                news:[...data.articles],
                isLoading:false
            })
        }
            
            
            );
    }
    handleForm(e){
        this.setState({...this.state, isLoading:true});
        e.preventDefault();
    }
    renderNews(){
        const{ news } = this.state;
        if(news.length){
            return(
                <div className="news-list">
                {news.map((newsItem,key) => (
                <div className="news-item" key={key}>
                    <img src={newsItem.urlToImage} alt="" />
                    <h3>{newsItem.title}</h3>
                    <span>Author: {newsItem.author}</span>
                    <p>{newsItem.content}</p>
                    <a href={newsItem.url} rel="noopener" target="_blank">
                        Read More
                    </a>
                </div>
                ))}
            </div>
            );
        }
        return <p>No news found!</p>;
    }
    render(){
        const{keywords,isLoading} = this.state;
        return(
            <div className="App-Components">
                <div className="news-form">
                    <h1>News Master</h1>
                    <input 
                        type="search"
                        value={keywords}
                        onChange={this.handleKeyword}
                        className="search-field"
                    />
                </div>
                {isLoading ? <div className="lds-dual-ring"></div> : this.renderNews()}
            </div>
     )   
    }
}

export default App;