import React, { Component } from "react";
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  render() {
    const { largeImageURL, webformatURL, tags } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <li className={css.ImageGalleryItem} onClick={this.toggleModal}>
          <img
            src={webformatURL}
            alt={tags}
            className={css.ImageGalleryItemImage}
          />
        </li>
        {isOpen && (
          <Modal onClose={this.toggleModal} src={largeImageURL} alt={tags} />
        )}
      </>
    );
  }
}