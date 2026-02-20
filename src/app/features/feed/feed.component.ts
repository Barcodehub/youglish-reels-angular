import { Component, OnInit, OnDestroy, inject, signal, HostListener, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FeedApiService } from '../../core/api/feed-api.service';
import { AuthService } from '../../core/auth/auth.service';
import { NextVideoResponse } from '../../shared/models/types';

declare const YG: any;

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit, OnDestroy {
  private feedApi = inject(FeedApiService);
  authService = inject(AuthService);  // Public for template access
  private router = inject(Router);

  currentVideo = signal<NextVideoResponse | null>(null);
  nextVideo = signal<NextVideoResponse | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);
  showSubtitles = signal(true);
  isTransitioning = signal(false);

  private widget: any = null;
  private startY = 0;
  private currentY = 0;
  private isDragging = false;

  constructor() {
    // Load YouGlish API script
    this.loadYouglishScript();
  }

  ngOnInit(): void {
    this.loadNextVideo();
    this.preloadNext();
  }

  ngOnDestroy(): void {
    if (this.widget) {
      this.widget = null;
    }
  }

  private loadYouglishScript(): void {
    if (typeof YG !== 'undefined') return;

    const script = document.createElement('script');
    script.src = 'https://youglish.com/public/emb/widget.js';
    script.async = true;
    document.head.appendChild(script);
  }

  loadNextVideo(): void {
    if (this.isTransitioning()) return;

    this.isTransitioning.set(true);
    this.isLoading.set(true);
    this.error.set(null);

    // Use preloaded video if available
    if (this.nextVideo()) {
      this.currentVideo.set(this.nextVideo());
      this.nextVideo.set(null);
      this.initializeYouglishWidget(this.currentVideo()!);
      this.isLoading.set(false);
      this.isTransitioning.set(false);
      this.preloadNext();
      return;
    }

    this.feedApi.getNextVideo().subscribe({
      next: (video) => {
        this.currentVideo.set(video);
        this.initializeYouglishWidget(video);
        this.isLoading.set(false);
        this.isTransitioning.set(false);
        this.preloadNext();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No hay videos disponibles. Agrega palabras/frases primero.');
        this.isLoading.set(false);
        this.isTransitioning.set(false);
      }
    });
  }

  private preloadNext(): void {
    this.feedApi.getNextVideo().subscribe({
      next: (video) => {
        this.nextVideo.set(video);
      },
      error: () => {
        // Silently fail preload
      }
    });
  }

  private initializeYouglishWidget(video: NextVideoResponse): void {
    if (typeof YG === 'undefined') {
      setTimeout(() => this.initializeYouglishWidget(video), 500);
      return;
    }

    const container = document.getElementById('youglish-widget');
    if (!container) return;

    container.innerHTML = '';

    this.widget = new YG.Widget('youglish-widget', {
      width: window.innerWidth,
      height: window.innerHeight,
      components: 0, // Hide all components for clean UI
      events: {
        'onFetchDone': () => {
          if (this.widget) {
            this.widget.fetch(video.phrase.text, video.phrase.language);
            this.widget.cueUp(video.trackNumber);
          }
        },
        'onVideoChange': () => {
          // Video is ready
        }
      }
    });

    this.widget.fetch(video.phrase.text, video.phrase.language);
  }

  toggleSubtitles(): void {
    this.showSubtitles.update(v => !v);
  }

  goToPhrases(): void {
    this.router.navigate(['/phrases']);
  }

  logout(): void {
    this.authService.logout();
  }

  // Touch and Scroll Handlers
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.startY = event.touches[0].clientY;
    this.isDragging = true;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.currentY = event.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;

    const deltaY = this.startY - this.currentY;

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) {
        // Swipe up - next video
        this.loadNextVideo();
      }
    }

    this.isDragging = false;
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    if (Math.abs(event.deltaY) > 50 && event.deltaY > 0) {
      this.loadNextVideo();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === ' ') {
      event.preventDefault();
      this.loadNextVideo();
    } else if (event.key === 's' || event.key === 'S') {
      this.toggleSubtitles();
    }
  }
}


