import { useEffect, useState } from "react";
import { TVShowAPI } from "./Api/tv-show";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import logoimg from "./assets/images/tv-show-icon.jpg"
import {Logo} from "./components/Logo/Logo"
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import {TVShowList} from "./components/TVShowList/TVShowList"
import { SearchBar } from "./components/SearchBar/SearchBar";
export function App(){
    const [currentTVShow,setcurrentTVShow]=useState();
    const [recommendationList,setrecommendationList]=useState([]);
    async function fetchPopulars(){
      const popularTVShowList=await TVShowAPI.fetchPopulars();
      if(popularTVShowList.length>0){
        setcurrentTVShow(popularTVShowList[0]);
      }
    }
    async function fetchRecommendations(tvShowId){
      const recommendationListResp=await TVShowAPI.fetchRecommendations(tvShowId);
      if(recommendationListResp.length>0){
        setrecommendationList(recommendationListResp.slice(0,10));
      }
    }

    async function fetchByTitle(title){
      const searchResponse=await TVShowAPI.fetchByTitle(title);
      if(searchResponse.length>0){
        setcurrentTVShow(searchResponse[0]);
      }
    }

    useEffect(()=>{
      fetchPopulars();
    },[])

    useEffect(()=>{
      if(currentTVShow)
      fetchRecommendations(currentTVShow.id);
    },[currentTVShow])

    function updateCurrentTVShow(tvShow){
      setcurrentTVShow(tvShow);
    }

    console.log(recommendationList);
    return (
      <div className={s.main_container}
      style={{background:currentTVShow?`linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
      url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`:"black"}}>
        <div className={s.header}>
          <div className="row">
            <div className="col-4">
              <Logo img={logoimg} title="Watowatch" subtitle="Find a show you may like"/>
            </div>
            <div className="col-md-12 
            col-lg-4">
              <SearchBar onSubmit={fetchByTitle}/>
            </div>
          </div>
        </div>
        <div className={s.tv_show_detail}>
          {currentTVShow &&<TVShowDetail tvShow={currentTVShow}/>}
        </div>
        <>
        <div className={s.recommended_tv_shows}>
        {currentTVShow &&<TVShowList onClick={updateCurrentTVShow} tvShowList={recommendationList}/>}
        </div>
        </>
      </div>
    );
  }