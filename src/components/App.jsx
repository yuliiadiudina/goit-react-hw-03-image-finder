import React, { Component } from "react";
import css from './App.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPictures } from 'api/pixabay';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';


export class App extends Component {

  state = {
    images: [],
    searchQuery: '',
    page: 0,
    lastPage: 0,
    status: 'idle',
  }

  async componentDidUpdate(_, prevState) {

    const { searchQuery, page } = this.state;

    if (prevState.page !== page && page !== 1) {
      this.setState({ status: 'pending' });
      this.loadMore(searchQuery,page);
    }

    if (prevState.searchQuery !== searchQuery && searchQuery !== "") {
      this.setState({ status: 'pending' });
      this.makeNewFetch(searchQuery, page)
    }
  }

  makeNewFetch = async (newQuery, page) => {
    try {
      const response = await fetchPictures(newQuery, page);
      const { totalHits, hits } = response;

      if (totalHits === 0) {
        this.setState({ lastPage: 1, status: 'rejected' });
        Notify.failure('Sorry, there are no images matching your search request. Please try another request.');
        return;
      }

      const lastPage = Math.ceil(totalHits / 12);
      this.setState({ lastPage, images: hits, status: 'resolved' });
      Notify.success(`Hurray! ${totalHits} images found`);

    } catch (error) {
      this.setState({ status: 'rejected' });
      console.log(error.message);
    }
  }

  loadMore = async (searchQuery, page) => {
    try {
        const response = await fetchPictures(searchQuery, page);
        this.setState(({ images }) => ({ images: [...images, ...response.hits], status: 'resolved' }));
        setTimeout(() => this.scroll(), 100);

      } catch (error) {
        this.setState({ status: 'rejected' });
        console.log(error.message);
      }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const newQuery = event.target.elements.input.value.trim();
    const page = 1;

    if (newQuery === "") {
      return Notify.warning('Search field is empty. Please, enter your request');
    }

    if (newQuery === this.state.query) {
      return Notify.warning('That is the same request. Please, enter a new one');
    }

    this.setState({ searchQuery: newQuery, page, images: [], status: 'pending' });

  }

  handleBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1, }));
  }

  scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  };

  render() {

    const { images, page, lastPage, status } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} isSubmitting={status === 'pending'} />
        <main>
          {images.length > 0 && <ImageGallery images={images} />}
          {status === 'pending'
            ? (<Loader />)
            : page !== lastPage && (<Button onClick={this.handleBtnClick} />)}
        </main>
      </div>
    )
  }
};


