import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PhraseApiService } from '../../../core/api/phrase-api.service';
import { Phrase, CreatePhraseRequest } from '../../../shared/models/types';

@Component({
  selector: 'app-phrase-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './phrase-list.component.html',
  styleUrl: './phrase-list.component.scss'
})
export class PhraseListComponent implements OnInit {
  private phraseApi = inject(PhraseApiService);
  private router = inject(Router);

  phrases = signal<Phrase[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  // Add phrase form
  showAddForm = signal(false);
  newPhraseText = signal('');
  newPhraseLanguage = signal('english');
  newPhraseAccent = signal('');
  isAddingPhrase = signal(false);

  ngOnInit(): void {
    this.loadPhrases();
  }

  loadPhrases(): void {
    this.isLoading.set(true);
    this.phraseApi.getUserPhrases().subscribe({
      next: (phrases) => {
        this.phrases.set(phrases);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar frases');
        this.isLoading.set(false);
      }
    });
  }

  toggleAddForm(): void {
    this.showAddForm.update(v => !v);
    this.newPhraseText.set('');
    this.error.set(null);
  }

  addPhrase(): void {
    if (!this.newPhraseText().trim()) {
      this.error.set('Por favor ingresa una palabra o frase');
      return;
    }

    this.isAddingPhrase.set(true);
    this.error.set(null);

    const request: CreatePhraseRequest = {
      text: this.newPhraseText().trim(),
      language: this.newPhraseLanguage(),
      accent: this.newPhraseAccent() || undefined
    };

    this.phraseApi.createPhrase(request).subscribe({
      next: (phrase) => {
        this.phrases.update(list => [...list, phrase]);
        this.toggleAddForm();
        this.isAddingPhrase.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Error al agregar frase');
        this.isAddingPhrase.set(false);
      }
    });
  }

  togglePhrase(phrase: Phrase): void {
    this.phraseApi.updatePhrase(phrase.id, !phrase.isActive).subscribe({
      next: (updated) => {
        this.phrases.update(list =>
          list.map(p => p.id === updated.id ? updated : p)
        );
      },
      error: () => {
        alert('Error al actualizar frase');
      }
    });
  }

  deletePhrase(id: number): void {
    if (!confirm('¿Estás seguro de eliminar esta frase?')) return;

    this.phraseApi.deletePhrase(id).subscribe({
      next: () => {
        this.phrases.update(list => list.filter(p => p.id !== id));
      },
      error: () => {
        alert('Error al eliminar frase');
      }
    });
  }

  goToFeed(): void {
    this.router.navigate(['/feed']);
  }
}

