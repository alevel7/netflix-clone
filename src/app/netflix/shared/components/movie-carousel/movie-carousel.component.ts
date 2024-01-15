import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { VideoContent } from '../../models/video-content.interface';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MovieCarouselComponent implements OnInit, AfterViewInit {
  @Input() movies: VideoContent[] = [];
  @Input() title!: string;
  @Output() selectedMovie = new EventEmitter<VideoContent>();
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedContent: string | null | undefined;
  constructor() { }
  ngAfterViewInit(): void {
    this.initSwiper()
  }

  ngOnInit(): void {
  }

  private initSwiper() {
    return new Swiper('.swiper-container', {
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: true,
      parallax: true,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: false,
        }
      }
    })
  }

  setHoverMovie(movie: VideoContent) {
    this.selectedContent = movie.title ?? movie.name;
  }

  clearHoverMovie() {
    this.selectedContent = null;
  }

  preview(movie:VideoContent) {
    this.selectedMovie.emit(movie)
  }

}