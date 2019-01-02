import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Observable } from 'rxjs';

@Injectable()
export class QueryService {
  usersList: AngularFireList<any>;
/*   languages: Language[] = [];
  plansRef: AngularFireList<Plan>;
  languagesRef: AngularFireList<Language>;
  cancelMembershipOptionsRef: AngularFireList<CancelMembershipOption>; */


  constructor(private firebase: AngularFireDatabase) {
/*     this.languagesRef = this.firebase.list<Language>('languages');
    this.plansRef = this.firebase.list<Plan>('plans');
    this.cancelMembershipOptionsRef = this.firebase.list<CancelMembershipOption>('cancelMembershipOptions'); */
    this.usersList = this.firebase.list('users');
  }

  getData() {
    return this.usersList;
  }

  getUsers(): Observable<any[]> {
    return this.usersList.valueChanges();
  }


  insertUser(user: any) {
    this.usersList.set(user.$uid, {
      name: user.name,
      email: user.email,
      password: user.password,
      plan: user.plan,
      language: user.language,
      numberOfChildren: user.numberOfChildren,
      isActive: user.isActive,
      reasonToCancelMembership: user.reasonToCancelMembership
    });
  }

  updateUser(updatedUser: any): void {
    this.firebase.object('/users/' + updatedUser.$uid).update(
      {
        name: updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
        plan: updatedUser.plan,
        language: updatedUser.language,
        numberOfChildren: updatedUser.numberOfChildren,
        isActive: updatedUser.isActive,
        reasonToCancelMembership: updatedUser.reasonToCancelMembership
      });
  }

  updateUserDetails(updatedData: any): void {
    this.firebase.object('/users/' + updatedData.uid).update(updatedData);
  }


  deleteUser($uid: string) {
    this.usersList.remove($uid);
  }



/* 
  getLanguagesObservable(): any {
    if (!this.languages.length) {
      this.languagesRef.valueChanges().subscribe((data) => {
        for (let i of data) {
          this.languages.push(i);
        }
        // this.languages = data;
      });
    }
    return this.languages;
  }

  getPlansObservable(): Observable<Plan[]> {
    return this.plansRef.valueChanges();
  }

  getCancelMembershipOptionsObservable(): Observable<CancelMembershipOption[]> {
    return this.cancelMembershipOptionsRef.valueChanges();
  }

  getUser(id: any) {
    return this.firebase.object('/users/' + id).snapshotChanges().map(res => {
      return res.payload.val();
    });
  } */

}
