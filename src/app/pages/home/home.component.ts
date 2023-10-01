import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {KnowledgeService} from "../../services/knowledge.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Knowledge} from "../../model/knowledge";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  KnowledgeForm: FormGroup;
  knowledgeData: Knowledge;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'urlToImage', 'summary', 'content' ];
  constructor( public service: KnowledgeService, private router: Router, private builder: FormBuilder) {
    this.knowledgeData = {} as Knowledge;
    this.dataSource = new MatTableDataSource<any>();
    this.KnowledgeForm = this.builder.group({
      title: ['', [Validators.required, Validators.maxLength(60)]],
      urlToImage: [''],
      summary: [''],
      content: ['']
    })
  }
  get title(){return this.KnowledgeForm.controls['title']}
  get urlToImage(){return this.KnowledgeForm.controls['urlToImage']}
  get summary(){return this.KnowledgeForm.controls['summary']}
  get content(){return this.KnowledgeForm.controls['content']}
  @ViewChild('KnowledgeForm', {static: false})
  form! : NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditKnowledge: boolean | undefined;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    //this.dataSource.paginator = this.paginator;
    this.getAllKnowledge();

  }
  getAllKnowledge(){
    this.service.getAll().subscribe((response :any) => {
      this.dataSource.data = response;

    });
  }


}
