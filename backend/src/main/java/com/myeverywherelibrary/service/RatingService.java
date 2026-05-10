package com.myeverywherelibrary.service;

import com.myeverywherelibrary.exception.ResourceNotFoundException;
import com.myeverywherelibrary.model.Book;
import com.myeverywherelibrary.model.Rating;
import com.myeverywherelibrary.repository.BookRepository;
import com.myeverywherelibrary.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private BookRepository bookRepository;

    // Get all ratings
    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    // Get rating by id
    public Rating getRatingById(Long id) {
        return ratingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rating not found with id: " + id));
    }

    // Get ratings by book id
    public List<Rating> getRatingsByBookId(Long bookId) {
        // Verify book exists
        bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + bookId));

        return ratingRepository.findByBook_Id(bookId);
    }

    // Create rating
    public Rating createRating(Long bookId, Rating rating) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + bookId));

        rating.setBook(book);
        return ratingRepository.save(rating);
    }

    // Update rating
    public Rating updateRating(Long id, Rating ratingDetails) {
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rating not found with id: " + id));

        rating.setOverallRating(ratingDetails.getOverallRating());
        rating.setUserNotes(ratingDetails.getUserNotes());

        return ratingRepository.save(rating);
    }

    // Delete rating
    public void deleteRating(Long id) {
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rating not found with id: " + id));

        ratingRepository.delete(rating);
    }
}
