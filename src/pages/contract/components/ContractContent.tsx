import moment from "moment";

const ContractContent = () => {
  return (
    <section className="content grid lg:grid-cols-2 gap-4 my-4">
      <div
        dir="rtl"
        className="font-readex-pro order-1 text-right flex flex-col gap-3"
      >
        <strong className="text-lg font-arabic font-readex-pro">
          أولاً : موضوع الإتفاقية
        </strong>
        <p>
          بموجب هذه الإتفاقية أتفق الطرف الأول مع الطرف الثاني بعقد من أجل أن
          يقوم الطرف الثاني بجميع المهام المطلوبة منه وذلك إبتداء من تاريخ :
          <strong> {moment().format("YYYY-MM-DD")}</strong>
          <br />
          يحق للطرف الأول بفسخ العقد مع الطرف الثاني في حال رصد أي ملاحظات أو
          عدم إلتزامه بالمهام المطلوبة منه أو الاخلال بالآداب العامة في أي وقت .
        </p>

        <strong className="font-arabic font-readex-pro">
          المستندات المطلوبة :{" "}
        </strong>
        <ul className="font-arabic font-readex-pro">
          <li className="font-arabic font-readex-pro">
            {" "}
            - الإقامة/ الهوية الوطنية
          </li>
          <li className="font-arabic font-readex-pro"> - شهادة خلو سوابق</li>
          <li className="font-arabic font-readex-pro">
            {" "}
            - معلومات الحساب البنكي
          </li>
        </ul>

        <strong className="font-arabic font-readex-pro">
          يقر الموظف بأن المعلومات في العقد معلومات صحيحة ويتحمل كامل المسؤولية
          عليها.
        </strong>

        <strong className="text-lg font-arabic font-readex-pro">
          ثانياً : المهام
        </strong>
        <p className="font-arabic font-readex-pro">
          يلتزم الطرف الثاني بأداء العمل الذي يسند إليه من قبل الطرف الأول تبعاً
          لتوجيهاته وإشرافه وأن يبذل في تأديته العناية اللازمة وأن يعمل بتنفيذ
          الأعمال المطلوبة منه .
        </p>

        <strong className="text-lg font-arabic font-readex-pro">
          ثالثاً : الإلتزامات
        </strong>
        <ul className="font-arabic font-readex-pro">
          <li className="font-arabic font-readex-pro">
            {" "}
            - يلتزم الطرف الثاني بوقت الحضور
          </li>
          <li className="font-arabic font-readex-pro">
            {" "}
            - يلتزم الطرف الثاني بحسن السلوك والمظهر وحسن التعامل مع الزوار
          </li>
          <li>
            {" "}
            - يلتزم الطرف الثاني بالحفاظ على جميع المعطيات التي في عهدته من
            الطرف الأول
          </li>
        </ul>

        <strong className="text-lg font-arabic font-readex-pro">
          رابعاً : السرية وعد الإفصاح
        </strong>
        <p className="font-arabic font-readex-pro">
          ان العمل مع الشركة سيعطيك حق الوصول إلى معلومات الملكية والمعلومات
          السرية للشركة وعملائها ومورديها وآخرين (ويشار إلى معلومات السرية
          والملكية بصيغة الجمع في هذه الاتفاقية بإسم المعلومات السرية ). <br />
          تشمل المعلومات السرية على سبيل المثال الحصر على قوائم العملاء ، الخطط
          التسويقية ، العروض ،العقود ،المعلومات الفنية أو المالية ،قواعد
          البيانات . تظل جميع المعلومات السرية ملكية للشركة.
        </p>

        <strong className="text-lg font-arabic font-readex-pro">
          خامساً : الخصومات
        </strong>
        <span className="font-arabic font-readex-pro">
          بناءً على المعطيات يحق للطرف الأول الخصومات التالية :
        </span>
        <ul className="font-arabic font-readex-pro">
          <li className="font-arabic font-readex-pro">
            {" "}
            - خصم مبلغ وقدره (1000 ريال ) في حال سوء استخدام التصريح مع الفصل
            المباشر من قبل الطرف الأول.
          </li>
          <li className="font-arabic font-readex-pro">
            {" "}
            - في حال التأخر عن العمل يحق للطرف خصم مبلغ (100 ريال ) من الطرف
            الثاني.
          </li>
          <li className="font-arabic font-readex-pro">
            {" "}
            - في حال تكرار التأخر عن العمل يحق للطرف الأول خصم مبلغ (300 ريال )
            والنظر في ظرف الحالة.
          </li>
          <li className="font-arabic font-readex-pro">
            {" "}
            - في حال فقدان أي من الأجهزة يتم خصم قيمة الجهاز بالكامل من الطرف
            الثاني .
          </li>
        </ul>
      </div>

      <div dir="ltr" className="order text-left flex flex-col gap-3">
        <strong className="text-lg">First: Agreement Subject</strong>

        <p>
          Under this agreement, the first party agrees with the second party to
          enter into a contract where the second party will carry out all the
          required tasks, starting from the date:{" "}
          <strong>{moment().format("YYYY-MM-DD")}</strong>.
          <br /> The first party has the right to terminate the contract with
          the second party if any issues are detected, if the second party fails
          to fulfill the required tasks, or if there is any breach of public
          morals at any time.
        </p>

        <strong>Required Documents : </strong>
        <ul>
          <li> - Iqama/National ID</li>
          <li> - Certificate of No Criminal Recored</li>
          <li> - Bank Account Information</li>
          <li> - STC Pay account Information</li>
        </ul>
        <strong>
          The employee acknowledges that the information in the contract is
          accurate and assumes full responsibility for it.
        </strong>

        <strong className="text-lg">Second: Tasks</strong>
        <p>
          The second party is committed to performing the work assigned to them
          by the first party according to their instructions and supervision.
          They must exercise the necessary care in carrying out the work and
          ensure that the required tasks are executed properly.
        </p>

        <strong className="text-lg">Third: Obligations</strong>
        <ul>
          <li> - The second party must adhere to the attendance time.</li>
          <li>
            - The second party must maintain good behavior, appearance, and
            proper conduct with visitors.
          </li>
          <li>
            - The second party must take care of all the assets entrusted to
            them by the first party.
          </li>
        </ul>
        <strong className="text-lg">
          Fourth: Confidentiality and Non-Disclosure
        </strong>
        <p>
          Working with the company will grant you access to proprietary and
          confidential information of the company, its clients, suppliers, and
          others (referred to collectively in this agreement as "Confidential
          Information"). <br /> Confidential Information includes, but is not
          limited to, customer lists, marketing plans, offers, contracts,
          technical or financial information, and databases. All Confidential
          Information remains the property of the company.
        </p>
        <strong className="text-lg">Fifth: Discounts</strong>
        <span>
          Based on the provided information, the first party is entitled to the
          following discounts:
        </span>
        <ul>
          <li>
            - A discount of 1000 Riyals in case of misuse of the permit with
            immediate termination by the first party.
          </li>
          <li>
            - In case of delay in work, the first party is entitled to deduct
            100 Riyals from the second party.
          </li>
          <li>
            - In case of repeated delays in work, the first party is entitled to
            deduct 300 Riyals and consider the circumstances of the case.
          </li>
          <li>
            - In case of losing any of the devices, the full value of the device
            will be deducted from the second party.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ContractContent;
