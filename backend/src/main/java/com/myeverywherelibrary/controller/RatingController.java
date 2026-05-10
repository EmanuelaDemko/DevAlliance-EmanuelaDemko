package com.myeverywherelibrary.controller;

import com.myeverywherelibrary.model.Rating;
import com.myeverywherelibrary.service.RatingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "*")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    // GET /api/ratings - Get all ratings
    @GetMapping
    public ResponseEntity<List<Rating>> getAllRatings() {
        List<Rating> ratings = ratingService.getAllRatings();
        return new ResponseEntity<>(ratings, HttpStatus.OK);
    }

    // GET /api/ratings/{id} - Get rating by id
    @GetMapping("/{id}")
    public ResponseEntity<Rating> getRatingById(@PathVariable Long id) {
        Rating rating = ratingService.getRatingById(id);
        return new ResponseEntity<>(rating, HttpStatus.OK);
    }

    // GET /api/ratings/book/{bookId} - Get ratings by book
    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<Rating>> getRatingsByBookId(@PathVariable Long bookId) {
        List<Rating> ratings = ratingService.getRatingsByBookId(bookId);
        return new ResponseEntity<>(ratings, HttpStatus.OK);
    }

    // POST /api/ratings - Create rating (bookId passed as request parameter)
    @PostMapping
    public ResponseEntity<Rating> createRating(@RequestParam Long bookId, @Valid @RequestBody Rating rating) {
        Rating createdRating = ratingService.createRating(bookId, rating);
        return new ResponseEntity<>(createdRating, HttpStatus.CREATED);
    }

    // PUT /api/ratings/{id} - Update rating
    @PutMapping("/{id}")
    public ResponseEntity<Rating> updateRating(@PathVariable Long id, @Valid @RequestBody Rating rating) {
        Rating updatedRating = ratingService.updateRating(id, rating);
        return new ResponseEntity<>(updatedRating, HttpStatus.OK);
    }

    // DELETE /api/ratings/{id} - Delete rating
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long id) {
        ratingService.deleteRating(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
