/*

 form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', passwordValidators],
      codigocheck: ['', Validators.required],
      //imagen: ['', Validators.required]

    });

    if (!this.isAddMode) {
      this.gestionService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.formGet.nombre.setValue(x.nombre);
          this.formGet.email.setValue(x.email);
          this.formGet.password.setValue(x.password);
        });
    }

  }

onSubmit() {

    this.submitted = true;

    console.log(this.formGet.id.value);
    console.log(this.formGet.nombre.value);
    console.log(this.formGet.email.value);
    console.log(this.formGet.password.value);
    console.log(this.formGet.codigocheck.value);

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.crearUsuario();
    } else {
      this.actualizarUsuario();
    }
  }



private crearUsuario() {
    this.gestionService.register(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertaService.success('User added successfully', { keepAfterRouteChange: true });
          this.router.navigate(['.', { relativeTo: this.route }]);
        },
        error => {
          this.alertaService.error(error);
          this.loading = false;
        });
  }


  private actualizarUsuario() {
    this.gestionService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertaService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['..', { relativeTo: this.route }]);
        },
        error => {
          this.alertaService.error(error);
          this.loading = false;
        });
  }

  */