import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IReportData } from '../../../interfaces/reportData.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IReport } from '../../../interfaces/report.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly _BASE_URL = import.meta.env.NG_APP_BASE_URL;
  private readonly _api = `${this._BASE_URL}/report`;
  constructor(private _http: HttpClient) {}

  getAllReports(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      message: string;
      reports: IReport[];
      totalItes: number;
    }>(`${this._api}`, { params, withCredentials: true });
  }

  addReport(reportData: IReportData) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this._api}/add`,
      reportData,
      {
        withCredentials: true,
      }
    );
  }

  getSingleReport(reportId: string, targetType: string, commentId = '') {
    const params = new HttpParams().set('commentId', commentId);
    return this._http.get<{
      success: boolean;
      message: string;
      reportData: IReport;
    }>(`${this._api}/getsinglereport/${reportId}/${targetType}`, {
      params,
      withCredentials: true,
    });
  }

  submitAdminReview(review: string, reportId: string) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this._api}/addreview/${reportId}`,
      { review },
      { withCredentials: true }
    );
  }
  
  statusChange(status: string, reportId: string) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/changestatus/${reportId}`,
      { status },
      { withCredentials: true }
    );
  }
}
