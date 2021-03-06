export const getMovieData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
      if (!response.ok) {
        throw Error('Error fetching movies');
      }
    return data;
};

export const fetchUser = async (email, password) => {
    const userLogin = { email: `${email}`, password: `${password}`};
    const options = {
        method: 'POST',
        body: JSON.stringify(userLogin),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch('https://rancid-tomatillos.herokuapp.com/api/v1/login', options)
    const user = await response.json()
    if (!response.ok) {
      throw Error('Error fetching user');
    }
    return user;
};

export const postRating = async (userRating, userID) => {
  const options = {
      method: 'POST',
      body: JSON.stringify(userRating),
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const post = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${userID}/ratings`, options)
  const rating = await post.json()
  if (!post.ok) {
    throw Error('Error fetching rating');
  }
  return rating;
};

export const fetchRatings = userID => {
    return fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${userID}/ratings`).then(response => {
      if (!response.ok) {
        throw Error('There was a problem fetching all ratings');
      }
      return response.json();
      // if (!response.ok) {
      //   throw Error('Error fetching ratings');
      // }
    });
};

export const removeRating = (userID, ratingID) => {

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${userID}/ratings/${ratingID}`, options).then(response => {
        if (!response.ok) {
          throw Error('There was a problem with the delete')
        }
        return "It's deleted!"
    })
};
