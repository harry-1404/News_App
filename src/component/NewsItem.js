import React from 'react'

const NewsItem=(props)=> {
    
        let {title, discription,imageUrl, newsUrl, author, date, source}= props;
        return (
            <div className="card" >
                <div style={{display: 'flex', justifyContent:'flex-end', position:'absolute', right:'0' }}>
                <span className=" badge rounded-pill bg-danger">{source}</span>
                </div>
                <img src={!imageUrl?"http://cdn.wionews.com/sites/default/files/2023/06/26/362442-untitled-design-2023-06-26t225912145.png":imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{discription}</p>
                    <p className="card-text"><small className="text-body-secondary"> By {author?author:'unknown'} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} className="btn btn-primary">Read more</a>
                </div>
            </div>

        )
    }

export default NewsItem
