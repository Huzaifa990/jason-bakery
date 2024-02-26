import React from "react";

export default function SubHeader(props) {
  return (
    <div className="breadcrumb-section breadcrumb-bgg">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="breadcrumb-text">
						<p>We sell fresh Cakes</p>
						<h1>{props.headerName}</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
  );
}
