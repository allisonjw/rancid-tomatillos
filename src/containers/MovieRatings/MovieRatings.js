import React from 'react';
import { connect } from 'react-redux';
import { postRating } from '../../util/apiCalls';
import { getMovieData } from '../../util/apiCalls';
import { addRating } from '../../actions/index';
import '../App/App.scss';

export const MovieRatings = ({movieId, rating, user, allRatings}) => {

  const setRating = async (rate) => {

    const userRating = {
      movie_id: movieId,
      rating: rate
    }

    return await postRating(userRating, user)
                .then(data => rating(data))
}
  const  handleClick = async (event) => {
    const rate = parseInt(event.target.id)
    return await setRating(rate)
  }

  const checkAllRatings = () => {
    return allRatings.filter(singleRating => {
      return singleRating.movie_id === movieId
    })
  }

return (
  checkAllRatings().length ?
  <p>{`Your rating: ${checkAllRatings()[0].rating}`}</p> :
  <section>
    <button id="1" onClick={(event) => handleClick(event)}>star1</button>
    <button id="2" onClick={(event) => handleClick(event)}>star2</button>
    <button id="3" onClick={(event) => handleClick(event)}>star3</button>
    <button id="4" onClick={(event) => handleClick(event)}>star4</button>
    <button id="5" onClick={(event) => handleClick(event)}>star5</button>
    <button id="6" onClick={(event) => handleClick(event)}>star6</button>
    <button id="7" onClick={(event) => handleClick(event)}>star7</button>
    <button id="8" onClick={(event) => handleClick(event)}>star8</button>
    <button id="9" onClick={(event) => handleClick(event)}>star9</button>
    <button id="10" onClick={(event) => handleClick(event)}>star10</button>
  </section>
  )

}

export const mapDispatchToProps = dispatch => ({
  rating: ratingData => dispatch(addRating(ratingData))
});

export const mapStateToProps = state => ({
  user: state.user.id,
  allRatings: state.ratings
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieRatings);
