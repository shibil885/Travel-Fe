import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WalletService } from '../../../shared/services/wallet.service';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { ITransaction, IWallet } from '../../../interfaces';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, CommonModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css',
})
export class WalletComponent {
  wallet: IWallet | null = null;
  dataSource: MatTableDataSource<ITransaction>;
  displayedColumns: string[] = ['date', 'type', 'description', 'amount'];

  constructor(private _walletService: WalletService) {
    this.dataSource = new MatTableDataSource<ITransaction>([]);
  }

  ngOnInit() {
    this._walletService
      .getOrCreateAdminWallet()
      .subscribe((wallet: IWallet) => {
        this.wallet = wallet;
        this.dataSource.data = wallet.history.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
  }
}
