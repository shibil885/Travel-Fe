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
  private reports = [
    {
      _id: '1',
      reportedBy: 'user123',
      targetType: 'post',
      targetId: 'post456',
      reason: 'spam',
      description: 'This post contains spam content and should be removed.',
      status: 'pending',
      createdAt: new Date('2023-05-01T10:30:00'),
    },
    {
      _id: '2',
      reportedBy: 'user456',
      targetType: 'comment',
      targetId: 'comment789',
      reason: 'abuse',
      description:
        'This comment contains abusive language and should be moderated.',
      status: 'reviewed',
      createdAt: new Date('2023-05-02T14:45:00'),
    },
    {
      _id: '3',
      reportedBy: 'user789',
      targetType: 'agency',
      targetId: 'agency123',
      reason: 'misinformation',
      description:
        'This agency is spreading false information about their services.',
      status: 'resolved',
      createdAt: new Date('2023-05-03T09:15:00'),
      resolvedAt: new Date('2023-05-04T11:30:00'),
    },
    {
      _id: '4',
      reportedBy: 'user101',
      targetType: 'package',
      targetId: 'package456',
      reason: 'inappropriate content',
      description:
        'This package contains inappropriate content for its target audience.',
      status: 'pending',
      createdAt: new Date('2023-05-05T16:20:00'),
    },
    {
      _id: '5',
      reportedBy: 'user202',
      targetType: 'post',
      targetId: 'post789',
      reason: 'copyright infringement',
      description:
        'This post contains copyrighted material without proper attribution.',
      status: 'reviewed',
      createdAt: new Date('2023-05-06T08:50:00'),
    },
  ];

  getReports(): Observable<any[]> {
    return of(this.reports);
  }

  getAllReports(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      message: string;
      reports: IReport[];
      totalItes: number;
    }>(`${this._api}`, { params, withCredentials: true });
  }

  updateReportStatus(id: string, status: string): Observable<any> {
    const report = this.reports.find((r) => r._id === id);
    if (report) {
      report.status = status;
      if (status === 'resolved') {
        report.resolvedAt = new Date();
      }
    }
    return of(report);
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
}
