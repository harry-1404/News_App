import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




const News=(props)=> {

const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(true);
const [page, setPage] = useState(1);
const [totalResult, setTotalResult] = useState(0)

const capitalizeFirstLetter = (string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
  
}

const updateBtn =async ()=> {
  props.setProgress(10);
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a900a307971f4e36a838a2c97e0b13b2&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true)
  let data = await fetch(url);
  props.setProgress(30);
  let parsedData = await data.json();
  props.setProgress(70);
  
  setArticles(parsedData.articles);
  setTotalResult(parsedData.totalResults);
  setLoading(false);
  props.setProgress(100);
}

useEffect(() => {
  document.title = `${capitalizeFirstLetter(props.category)} - News With Harry`
  updateBtn();
  // eslint-disable-next-line
},[])


const handleNextClick = async () => {

    setPage(page+1)
    updateBtn()
  }

const handlePervClick = async () => {

    setPage(page-1)
    updateBtn()
  }

const fetchMoreData = async () => {
    setPage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a900a307971f4e36a838a2c97e0b13b2&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResult(parsedData.totalResults)
    
  }
  return(

      <>
        <h1 className='text-center' style={{ margin: '35px' }}>News with Harry - Top {capitalizeFirstLetter(props.category)} Headline</h1>
        {loading && <Spinner/>}
        <div className="cont">

        <InfiniteScroll style={{overflow: 'hidden'}}
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResult}
          loader={<Spinner />}>

          <div className='container' >
            <div className="row my-4">
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title : ""} discription={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
          </div>
        <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-primary" onClick={handlePervClick}> &larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResult / props.pageSize)} type="button" className="btn btn-primary" onClick={handleNextClick}> Next &rarr;</button>
        </div>
      
        </>
  )}


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'science'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
