package com.myeverywherelibrary.repository;

import com.myeverywherelibrary.model.Book;
import com.myeverywherelibrary.model.BookStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByUser_Id(Long userId);

    List<Book> findByStatus(BookStatus status);
}
