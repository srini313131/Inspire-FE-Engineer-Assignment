import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Author } from 'src/app/types';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorCardComponent {
  @Input() author: Author | null = null;
}
