import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ITransaction, IWallet } from '../../../interfaces/wallet.interface';
import { WalletService } from '../../../shared/services/wallet.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  wallet: IWallet | null = null;
  dataSource: MatTableDataSource<ITransaction>;
  displayedColumns: string[] = ['date', 'type', 'description', 'amount'];

  constructor(private _walletService: WalletService) {
    this.dataSource = new MatTableDataSource<ITransaction>([]);
  }

  ngOnInit() {
    this._walletService.getOrCreateUserWallet().subscribe(
      (wallet: IWallet) => {
        this.wallet = wallet;
        this.dataSource.data = wallet.history.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },
      (error) => {
        console.error('Error fetching wallet data:', error);
      }
    );
  }
}

export default Component;
